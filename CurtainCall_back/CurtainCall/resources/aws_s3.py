# 절대절대 git에 올리지 말 것
# 각자의 s3서버를 만들어서 테스트해보세요
import os

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')

AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

AWS_REGION = 'ap-northeast-2'

###S3 Storages
AWS_STORAGE_BUCKET_NAME = 'ossw-curtaincall-bucket' # 설정한 버킷 이름
AWS_S3_CUSTOM_DOMAIN = '%s.s3.%s.amazonaws.com' % (AWS_STORAGE_BUCKET_NAME,AWS_REGION)
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
