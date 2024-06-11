from PIL.ExifTags import TAGS
from datetime import datetime
import time


def get_metadata_time(image):
    try:
        # EXIF 데이터 추출
        exif_data = image._getexif()
        if not exif_data:
            return None

        # EXIF 데이터에서 DateTimeOriginal 태그 찾기
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag == 'DateTimeOriginal':
                # 날짜 문자열을 datetime 객체로 변환
                datetime_obj = datetime.strptime(value, '%Y:%m:%d %H:%M:%S')
                # Unix 타임스탬프로 변환
                unix_time = time.mktime(datetime_obj.timetuple())
                print("메타데이터 비교!")
                print(unix_time)
                return unix_time
        return None
    except Exception as e:
        print(f"Error extracting metadata time: {e}")
        return None