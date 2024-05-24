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

    def validate(self, attrs):
        url_list = []

        for image in attrs.get("image_list"):
            url = self.create_presigned_url(image=image)
            url_list.append(url)

        attrs["url"] = url_list
        return attrs

    @staticmethod
    def create_presigned_url(
            image, content_type="images", expiration=3600
    ):
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
            object_key = "/".join([f"media/{content_type}", f"{str(uuid.uuid4())}.{name[-1]}"])

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