import cv2
import numpy as np

def calculate_histogram(image):
    # 이미지를 OpenCV 형식으로 변환 (Pillow -> OpenCV)
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    # 이미지의 각 채널(B, G, R)을 분리합니다.
    b, g, r = cv2.split(image)

    # 각 채널에 대한 히스토그램 계산
    hist_b = cv2.calcHist([b], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([g], [0], None, [256], [0, 256])
    hist_r = cv2.calcHist([r], [0], None, [256], [0, 256])

    # 히스토그램을 정규화
    cv2.normalize(hist_b, hist_b, 0, 1, cv2.NORM_MINMAX)
    cv2.normalize(hist_g, hist_g, 0, 1, cv2.NORM_MINMAX)
    cv2.normalize(hist_r, hist_r, 0, 1, cv2.NORM_MINMAX)

    # 딕셔너리 형태로 반환
    histogram_data = {
        'blue': hist_b,
        'green': hist_g,
        'red': hist_r
    }

    return histogram_data


def compare_histogram(hist1, hist2):
    # 히스토그램 비교 방법 설정
    method = cv2.HISTCMP_INTERSECT

    # 히스토그램 비교 수행
    ret_b = cv2.compareHist(hist1['blue'], hist2['blue'], method) / np.sum(hist1['blue'])
    ret_g = cv2.compareHist(hist1['green'], hist2['green'], method) / np.sum(hist1['green'])
    ret_r = cv2.compareHist(hist1['red'], hist2['red'], method) / np.sum(hist1['red'])
    ret = (ret_b + ret_g + ret_r) / 3
    print("히스토그램 비교!")
    print(ret)
    return ret