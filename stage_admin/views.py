from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

import boto3
import uuid

import CurtainCall.settings as settings

class helloAPI(APIView):
    def get(self, request):
        return Response("hello, world!")

class mack_stage(APIView):
    def post(self, request):
        # 1 input data
        data = request.data
        folderName = data.get('folderName')

        # 2 name preprocessing
        db_id = uuid.uuid4()

        # 3 mack S3 folder
        session = boto3.Session(
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )

        s3_client  = session.client('s3')
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        folder_key = db_id + '/'

        response = s3_client.put_object(
            Bucket=bucket_name,
            Key=folder_key
        )

        # 응답 확인
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            pass
            # print(f"폴더 '{folder_name}'가 성공적으로 생성되었습니다.")
        else:
            # print(f"폴더 생성에 실패했습니다. 응답 코드: {response['ResponseMetadata']['HTTPStatusCode']}")
            pass

        # 4 save db
        # 데이터 베이스 제작 협의 필요

        # send response
        return Response(db_id, status=status.HTTP_201_CREATED)


