from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import Stage_list, User_list
from accounts.models import User

import boto3
from botocore.exceptions import ClientError
from datetime import datetime

from CurtainCall.settings import AWS_S3

def create_s3_bucket(db_id):
    session = boto3.Session(
        aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
    )

    s3_client = session.client('s3')
    bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME
    folder_key = str(db_id) + '/'

    #file_key = folder_key + 'info.txt'
    #file_content = f"mack host: {host}\n"
    #file_content += f"mack time: {datetime.now()}\n"

    try:
        # 정보 파일 업로드
        #s3_client.put_object(Bucket=bucket_name, Key=file_key, Body=file_content)
        # row 데이터 폴더 업로드
        #s3_client.put_object(Bucket=bucket_name, Key=folder_key + 'row_image/', Body='')

        # 기본 stage 폴더 업로드
        s3_client.put_object(Bucket=bucket_name, Key=folder_key, Body='')
        # print(f"File '{file_key}' uploaded successfully.")
    except ClientError as e:
        # print(f"Error uploading file '{file_key}': {e}")
        return False

    return True

class createStage(APIView):
    """
    스테이지 생성 후 스테이지 ID 반환
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            #'name': openapi.Schema(type=openapi.TYPE_STRING, description='호스트 명')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
            'userId': openapi.Schema(type=openapi.TYPE_STRING, description='유저 ID')
        })})
    def post(self, request):

        # 1 input data
        user = request.user
        username = user.username

        # 2 name preprocessing

        # 3 check if user already has stage as host
        old_stage = Stage_list.objects.filter(host=username)
        if old_stage.exists():
            old_stage.delete()

        # 4 save db
        new_stage = Stage_list.create(username)
        db_id = new_stage.id
        new_stage.save()
        user.stage_uuid = new_stage
        user.save()

        if not create_s3_bucket(db_id):
            request = {"status": "fail", "message": "s3 bucket create fail"}
            return Response(request, status=status.HTTP_200_OK)

        # 5 response
        request = {"stageId": db_id}
        # send response
        return Response(request, status=status.HTTP_200_OK)


class joinStage(APIView):
    """
    스테이지 참가
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID')
            #'name': openapi.Schema(type=openapi.TYPE_STRING, description='유저 명')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부')
        })})
    def post(self, request):

        # 1 input data
        data = request.data
        stageId = data.get('stageId')
        user = request.user
        #name = data.get('name')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 3 save db
        #new_user_list = User_list.create(stage, name)
        #user_id = new_user_list.id
        #new_user_list.save()
        user.stage_uuid = stage
        user.save()

        # 4 response
        request = {"status": "success", "stageId": stageId, "userId": user.username}
        # send response
        return Response(request, status=status.HTTP_200_OK)


class seandImge(APIView):
    """
    이미지 전송 여부 변경
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
            'userID': openapi.Schema(type=openapi.TYPE_STRING, description='유저 ID')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부')
        })})
    def post(self, request):

        # 1 input data
        data = request.data
        stageId = data.get('stageId')
        userID = data.get('userId')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 3 check user
        try:
            user = User_list.objects.get(id=userID)
        except User_list.DoesNotExist:
            request = {"status": "fail", "message": "user not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 4 change sendImage
        user.set_send_image_flag()

        # 5 response
        request = {"status": "success"}
        # send response
        return Response(request, status=status.HTTP_200_OK)


class checkStageUsers(APIView):
    """
    스테이지 유저 상태 확인
    """

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='스테이지 ID', required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부'),
            'users': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='유저 전송 정보')
        })})
    def get(self, request):

        # 1 input data
        data = request.GET
        stageId = data.get('stageId')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 3 find users
        users = User.objects.filter(stage_uuid_id=stageId)
        users_send_info = users.values('username', 'user_ready')

        # 4 response
        request = {"status": "success", "users": users_send_info}
        # send response
        return Response(request, status=status.HTTP_200_OK)

class checkStage(APIView):
    """
    스테이지 상태 확인
    """

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='스테이지 ID', required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부'),
            'users': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='유저 전송 정보')
        })})
    def get(self, request):

        # 1 input data
        data = request.GET
        stageId = data.get('stageId')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 4 response
        request = {"status": "success", "stage": stage}
        # send response
        return Response(request, status=status.HTTP_200_OK)

class getStageSort(APIView):
    """
    스테이지 정렬 여부 확인
    """

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='스테이지 ID', required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부'),
            'sort': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='정렬 여부')
        })})
    def get(self, request):

        # 1 input data
        data = request.GET
        stageId = data.get('stageId')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 4 response
        request = {"status": "success", "sort": stage.get_sort_flag()}
        # send response
        return Response(request, status=status.HTTP_200_OK)