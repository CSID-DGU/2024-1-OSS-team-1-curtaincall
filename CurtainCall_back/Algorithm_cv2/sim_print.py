import glob

import tensorflow as tf
from keras.applications.efficientnet_v2 import EfficientNetV2B2, preprocess_input, decode_predictions
from keras.preprocessing import image
import numpy as np
from CurtainCallApp.models import Photo
import requests
from io import BytesIO
from PIL import Image

from Stage.models import Stage_list

from .fetch_image import fetch_image

import os
import ssl
import certifi

os.environ['SSL_CERT_FILE'] = certifi.where()
ssl._create_default_https_context = ssl._create_unverified_context

# 사전 훈련된 MobileNetV2 모델 로드
model = None

def load_model():
    global model
    model = EfficientNetV2B2(weights='imagenet')

def get_single_keyword(fileurl):
    # 이미지 로드 및 전처리
    preprocessed_image = load_and_prepare_image_from_url(fileurl)

    # 이미지에 대한 예측 수행
    predictions = model.predict(preprocessed_image)

    # 예측 결과를 해석하여 키워드 추출
    decoded_predictions = decode_predictions(predictions, top=2)  # 상위 3개 결과
    labels = []
    for i, (imagenet_id, label, score) in enumerate(decoded_predictions[0]):
        labels.append(label)
    return labels


def load_and_prepare_image(filepath):
    # 이미지 파일을 로드하고 모델에 맞게 전처리
    img = image.load_img(filepath, target_size=(260, 260))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)


def load_and_prepare_image_from_url(fileurl):
    # 이미지 데이터를 웹에서 받아옵니다.
    response = requests.get(fileurl)
    image_bytes = BytesIO(response.content)

    # 이미지 파일을 로드하고 모델에 맞게 전처리
    img = Image.open(image_bytes)
    img = img.resize((260, 260))  # target_size와 동일하게 설정
    img = img.convert('RGB')
    # Pillow 이미지를 배열로 변환
    img_array = image.img_to_array(img)

    # 차원 확장
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)

    # 모델 입력 전처리
    return preprocess_input(img_array_expanded_dims)


def predict_image_keywords(fileurl):
    # 사전 훈련된 MobileNetV2 모델 로드
    # model = EfficientNetV2B2(weights='imagenet')

    # 이미지 로드 및 전처리
    preprocessed_image = load_and_prepare_image_from_url(fileurl)

    # 이미지에 대한 예측 수행
    predictions = model.predict(preprocessed_image)

    # 예측 결과를 해석하여 키워드 추출
    decoded_predictions = decode_predictions(predictions, top=3)  # 상위 3개 결과
    print('Predicted Keywords:')
    for i, (imagenet_id, label, score) in enumerate(decoded_predictions[0]):
        print(f"{i + 1}: {label} ({score * 100:.2f}%)")


def getsim(stage_id):
    all_photos = fetch_image(stage_id)
    keyword_to_group = {}
    group_to_image = {}
    i = 0
    for filename in all_photos:
        # single_photo = {}
        # single_photo['photo_url'] = filename
        keywords = get_single_keyword(filename)
        # single_photo['keywords'] = keywords
        final_result = None
        leftover_keyword = []
        for keyword in keywords:
            search_result = keyword_to_group.get(keyword)
            if search_result is None:
                leftover_keyword.append(keyword)
            else:
                final_result = search_result
                break
        if final_result is None:
            i += 1
            final_result = i
            group_to_image[final_result] = set()
            for keyword in leftover_keyword:
                keyword_to_group[keyword] = final_result
        # single_photo.group_id = final_result
        # single_photo.save()
        group_to_image[final_result].add(filename)

        # predict_image_keywords(filename)
        print(filename)

    Stage_list.objects.get(id=stage_id).set_sort_flag()
    return group_to_image
