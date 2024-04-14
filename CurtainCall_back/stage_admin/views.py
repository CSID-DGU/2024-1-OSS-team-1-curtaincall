from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import MyModel, Stage_list, User_list

import boto3
import uuid

import CurtainCall.settings as settings


class helloAPI(APIView):
    def get(self, request):
        return Response("hello, world!")


class creatStage(APIView):
    """
    스테이지 생성 후 스테이지 ID 반환
    """
    @swagger_auto_schema(
        request_body=(openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING, description='호스트 명')
        })),
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'stageId': openapi.Schema(type=openapi.TYPE_STRING, description='스테이지 ID')
        })})
    def post(self, request):

        # 1 input data
        data = request.data
        name = data.get('name')

        # 2 name preprocessing
        db_id = uuid.uuid4()

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

        # 4 save db
        new_stage = Stage_list.create(db_id, name)
        new_stage.save()
        new_user_list = User_list.create(new_stage, name)
        new_user_list.save()

        # 5 response
        request = {"stageId": db_id}
        # send response
        return Response(request, status=status.HTTP_200_OK)
