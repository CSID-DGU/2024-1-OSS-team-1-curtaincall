from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from Image.certificate import PresignedURLSerializer as PresignedURLSerializer
import uuid


import boto3
from botocore.exceptions import ClientError

from CurtainCall.settings import AWS_S3

# Create your views here.

#############################
# 이미지 확장자 필터링
whitelist = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')
blacklist = ('.txt', '.pdf', '.doc')
#############################

class findFolderList(APIView):
    """
    생성된 폴더 리스트 반환
    """
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='스테이지 ID', required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'folderLen': openapi.Schema(type=openapi.TYPE_INTEGER, description='폴더 개수'),
            'folderList': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING, description='폴더 리스트'))
        })})
    def get(self, request):

        request = request.GET
        stage_id = request.get('stageId')
        stage_id_folder = stage_id + '/'

        # 1 s3 client 생성
        session = boto3.Session(
            aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
        )
        s3_client = session.client('s3')

        # 2 bucket name
        bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME

        # 3 폴더 리스트 가져오기
        response = s3_client.list_objects_v2(
            Bucket=bucket_name,
            Prefix=stage_id_folder,
            Delimiter='/'
        )

        # stageId가 없을 경우
        # KeyCount가 0이면 stageId가 없는 것으로 간주
        # 현재 예외처리 방법 없음
        if response.get("KeyCount") == 0:
            return Response({"status": "fail", "message": "stageId not found"}, status=status.HTTP_200_OK)

        # CommonPrefixes 키에 있는 폴더 리스트 가져오기
        if 'CommonPrefixes' in response:
            folders = [prefix['Prefix'].replace(stage_id + "/", '').rstrip('/') for prefix in
                       response['CommonPrefixes']]
        folders.remove('row_image')

        request = {"folderLen":len(folders),'folderList': folders}
        return Response(request, status=status.HTTP_200_OK)

class findImageList(APIView):
    """
    폴더 내 이미지 리스트 반환
    """
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('stageId', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='스테이지 ID', required=True),
            openapi.Parameter('folderNum', openapi.IN_QUERY, type=openapi.TYPE_STRING, description='폴더 이름', required=True)
        ],
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'imageLen': openapi.Schema(type=openapi.TYPE_INTEGER, description='이미지 개수'),
            'imageList': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_STRING, description='이미지 리스트'))
        })})
    def get(self, request):
            request = request.GET
            stage_id = request.get('stageId')
            folder_name = request.get('folderNum')
            stage_id_folder = stage_id + '/'
            folder_name_folder = f"{folder_name}/"

            # 1 s3 client 생성
            session = boto3.Session(
                aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
            )
            s3_client = session.client('s3')

            # 2 bucket name
            bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME

            # 3 이미지 리스트 가져오기
            response = s3_client.list_objects_v2(
                Bucket=bucket_name,
                Prefix=stage_id_folder + folder_name_folder,
            )

            # stageId가 없을 경우
            # KeyCount가 0이면 stageId가 없는 것으로 간주
            # 현재 예외처리 방법 없음
            if response.get("KeyCount") == 0:
                return Response({"status": "fail", "message": "stageId or folderNum not found"}, status=status.HTTP_200_OK)

            # 이미지 파일의 링크를 저장할 리스트 초기화
            image_links = []

            # 객체 중 이미지 파일인 것만 필터링하여 리스트에 추가
            for obj in response.get('Contents', []):
                key = obj['Key']
                # 이미지 파일인지 확인
                if key.lower().endswith(whitelist):
                    if not key.lower().endswith(blacklist):
                        # 이미지 파일의 링크 생성 및 리스트에 추가
                        image_link = f"https://{bucket_name}.s3.amazonaws.com/{key}"
                        image_links.append(image_link)

            request = {"imageLen":len(image_links),'imageList': image_links}
            return Response(request, status=status.HTTP_200_OK)


class PresignedURLView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PresignedURLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class uploadImage(APIView):
    """
    이미지 row 폴더 업로드
    """
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
                'file': openapi.Schema(type=openapi.TYPE_FILE, description='이미지 파일')
            }
        ),
    responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
        'status': openapi.Schema(type=openapi.TYPE_STRING, description='상태'),
        'message': openapi.Schema(type=openapi.TYPE_STRING, description='메시지')
    })})
    def post(self, request):
        stage_id = request.POST.get('stageId')
        photos = request.FILES.getlist('file')

        # 1 s3 client 생성
        session = boto3.Session(
            aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
        )
        s3_client = session.client('s3')

        # 2 bucket name
        bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME

        # 3 이미지 업로드
        for photo in photos:
            # 이미지 파일인지 확인
            if photo.name.lower().endswith(whitelist):
                if not photo.name.lower().endswith(blacklist):
                    # 이미지 파일의 링크 생성 및 리스트에 추가
                    file_ext = photo.name.split('.')[-1]
                    # key = f"{stage_id}/row/{photo.name}"
                    key = f"{stage_id}/row_image/{str(uuid.uuid4())+'.'+file_ext}"
                    s3_client.upload_fileobj(photo, bucket_name, key)

        return Response({"status": "success", "message": "image upload success"}, status=status.HTTP_200_OK)

class bestImage(APIView):
    """
    가장 잘 나온 이미지 저장 API
    """
    @swagger_auto_schema(
         request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID'),
                'folderNum': openapi.Schema(type=openapi.TYPE_STRING, description='폴더 이름'),
                'bestImage': openapi.Schema(type=openapi.TYPE_STRING, description='best 이미지 이름')
            },
        ),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING, description='상태'),
            'message': openapi.Schema(type=openapi.TYPE_STRING, description='메시지')
        })})
    def post(self, request):
        stage_id = request.data.get('stageId')
        folder_name = request.data.get('folderNum')
        best_image = request.data.get('bestImage')

        # 1 s3 client 생성
        session = boto3.Session(
            aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
        )
        s3_client = session.client('s3')

        # 2 bucket name
        bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME

        # 폴더 내부에 best.txt 파일 생성
        key = f"{stage_id}/{folder_name}/best_image.txt"

        try:
            response = s3_client.get_object(Bucket=bucket_name, Key=key)
        except ClientError as e:
            s3_client.put_object(Bucket=bucket_name, Key=key, Body='')
            response = s3_client.get_object(Bucket=bucket_name, Key=key)

        info = response['Body'].read().decode('utf-8')
        info += "\n"
        info += best_image
        s3_client.put_object(Bucket=bucket_name, Key=key, Body=info)

        # # info.txt 파일 에 업데이트
        # key = f"{stage_id}/info.txt"
        # response = s3_client.get_object(Bucket=bucket_name, Key=key)
        # info = response['Body'].read().decode('utf-8')
        # info += "\n"
        # info += f"best image : {folder_name} : {best_image}"
        # s3_client.put_object(Bucket=bucket_name, Key=key, Body=info)

        return Response({"status": "success", "message": "best image upload success"}, status=status.HTTP_200_OK)