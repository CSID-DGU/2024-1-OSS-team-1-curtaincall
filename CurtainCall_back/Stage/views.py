from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import Stage_list, User_list

import boto3

import CurtainCall.settings as settings


class creatStage(APIView):
    """
    스테이지 생성 후 스테이지 ID 반환
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING, description='호스트 명')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
            'userId': openapi.Schema(type=openapi.TYPE_STRING, description='유저 ID')
        })})
    def post(self, request):

        # 1 input data
        data = request.data
        name = data.get('name')

        # 2 name preprocessing

        # 4 save db
        new_stage = Stage_list.create(name)
        db_id = new_stage.id
        new_stage.save()
        new_user_list = User_list.create(new_stage, name)
        user_id = new_user_list.id
        new_user_list.save()

        # 3 mack S3 folder
        session = boto3.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )

        s3_client = session.client('s3')
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        folder_key = str(db_id) + '/'

        try:
            # s3 제작 예외처리 부
            s3_client.put_object(Bucket=bucket_name, Key=(folder_key))
        except Exception as e:
            pass

        # 5 response
        request = {"stageId": db_id, "userId": user_id}
        # send response
        return Response(request, status=status.HTTP_200_OK)


class joinStage(APIView):
    """
    스테이지 참가
    """

    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
            'name': openapi.Schema(type=openapi.TYPE_STRING, description='유저 명')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='성공 여부')
        })})
    def post(self, request):

        # 1 input data
        data = request.data
        stageId = data.get('stageId')
        name = data.get('name')

        # 2 check stage
        try:
            stage = Stage_list.objects.get(id=stageId)
        except Stage_list.DoesNotExist:
            request = {"status": "fail", "message": "stage not exist"}
            return Response(request, status=status.HTTP_200_OK)

        # 3 save db
        new_user_list = User_list.create(stage, name)
        user_id = new_user_list.id
        new_user_list.save()

        # 4 response
        request = {"status": "success", "stageId": stageId, "userId": user_id}
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
        user.change_sendImage()

        # 5 response
        request = {"status": "success"}
        # send response
        return Response(request, status=status.HTTP_200_OK)


class checkStage(APIView):
    """
    스테이지 상태 확인
    """

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name='stageId',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='스테이지 ID'
            )
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
        users = User_list.objects.filter(stage_id=stageId)
        users_send_info = users.values('user', 'sendImage')

        # 4 response
        request = {"status": "success", "users": users_send_info}
        # send response
        return Response(request, status=status.HTTP_200_OK)
