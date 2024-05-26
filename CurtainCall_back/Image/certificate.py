import logging
import uuid

import boto3
from botocore.exceptions import ClientError
from rest_framework import serializers
from CurtainCall.donotcommit import aws_s3 as s3

logger = logging.getLogger(__name__)


class PresignedURLSerializer(serializers.Serializer):
    # name = serializers.CharField(write_only=True)
    # content_type = serializers.CharField(write_only=True)
    url = serializers.ListSerializer(read_only=True, child=serializers.URLField(read_only=True))
    image_list = serializers.ListSerializer(write_only=True, child=serializers.CharField(write_only=True))


    # 유저이름과 스테이지 아이디 저장 후 기본 생성자 호출
    def __init__(self, *args, **kwargs):
        self.username = kwargs.pop("username")
        self.stage_id = kwargs.pop("stage_id")

        super().__init__(*args, **kwargs)


    def validate(self, attrs):
        url_list = []

        username = self.username
        stage_id = self.stage_id

        print(attrs)

        for image in attrs.get("image_list"):
            url = self.create_presigned_url(image=image, username=username, stage_id=stage_id)
            url_list.append(url)

        attrs["url"] = url_list
        return attrs

    @staticmethod
    def create_presigned_url(
            image, username, stage_id
    ):
        #content_type = "images"
        expiration = 3600
        aws_access_key_id = s3.AWS_ACCESS_KEY_ID
        aws_secret_access_key = s3.AWS_SECRET_ACCESS_KEY

        s3_client = boto3.client(
            "s3",
            region_name=s3.AWS_REGION,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
        )
        try:

            # 프론트로부터 받은 "이미지 이름.이미지 확장자"
            # formData가 아닌 string
            name = image.split(".")
            #object_key = "/".join([f"{stage_id}", f"{str(uuid.uuid4())}.{name[-1]}"])
            object_key = "/".join([f"{stage_id}", f"{username}_{image}"])

            url = s3_client.generate_presigned_url(
                "put_object",
                Params={
                    # "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                    "Bucket": s3.AWS_STORAGE_BUCKET_NAME,
                    "Key": object_key,
                },
                ExpiresIn=expiration,
            )
            logger.info("Got presigned URL: %s", url)

        except ClientError as e:
            logging.error(e)
            return None

        return url

    def create(self, validated_data):
        logger.info("S3 Presigned Url")
        logger.info(validated_data)
        return validated_data