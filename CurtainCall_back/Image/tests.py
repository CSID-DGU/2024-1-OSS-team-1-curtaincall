# from django.test import TestCase
# from CurtainCall.settings import AWS_S3
# import boto3
# # Create your tests here.
# stage_id = "c4163809-0861-4b50-bfcc-3e36c3c2729d"
#
# folder_name = 2
# stage_id_folder = stage_id + '/'
# folder_name_folder = f"folder_{folder_name}/"
#
# # 1 s3 client 생성
# session = boto3.Session(
#     aws_access_key_id=AWS_S3.AWS_ACCESS_KEY_ID,
#     aws_secret_access_key=AWS_S3.AWS_SECRET_ACCESS_KEY,
# )
# s3_client = session.client('s3')
#
# # 2 bucket name
# bucket_name = AWS_S3.AWS_STORAGE_BUCKET_NAME
#
# response = s3_client.list_objects_v2(
#     Bucket=bucket_name,
#     Prefix=stage_id_folder + folder_name_folder,
# )
#
#
#
#
# whitelist = ('.png', '.jpg', '.jpeg', '.gif', '.bmp')
# blacklist = ('.txt', '.pdf', '.doc')
#
# # 이미지 파일의 링크를 저장할 리스트 초기화
# image_links = []
#
# # 객체 중 이미지 파일인 것만 필터링하여 리스트에 추가
# for obj in response.get('Contents', []):
#     key = obj['Key']
#     # 이미지 파일인지 확인
#     if key.lower().endswith(whitelist):
#         if not key.lower().endswith(blacklist):
#             # 이미지 파일의 링크 생성 및 리스트에 추가
#             image_link = f"https://{bucket_name}.s3.amazonaws.com/{key}"
#             image_links.append(image_link)
#
# print(image_links)
