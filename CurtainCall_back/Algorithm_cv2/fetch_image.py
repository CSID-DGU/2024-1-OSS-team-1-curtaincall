import boto3
from CurtainCall.resources import aws_s3 as AWS_S3
from Image.views import whitelist, blacklist


def fetch_image(stage_id):
    stage_id_folder = str(stage_id) + '/'

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
        Prefix=stage_id_folder,
    )

    # stageId가 없을 경우
    # KeyCount가 0이면 stageId가 없는 것으로 간주
    # 현재 예외처리 방법 없음
    if response.get("KeyCount") == 0:
        return "No Stage ID Found"

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

    return image_links
