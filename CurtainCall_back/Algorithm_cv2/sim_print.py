import glob

import tensorflow as tf
from keras.applications.efficientnet_v2 import EfficientNetV2B2, preprocess_input, decode_predictions
from keras.preprocessing import image
import numpy as np


def load_and_prepare_image(filepath):
    # 이미지 파일을 로드하고 모델에 맞게 전처리
    img = image.load_img(filepath, target_size=(260, 260))
    img_array = image.img_to_array(img)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)


def predict_image_keywords(filepath):
    # 사전 훈련된 MobileNetV2 모델 로드
    model = EfficientNetV2B2(weights='imagenet')

    # 이미지 로드 및 전처리
    preprocessed_image = load_and_prepare_image(filepath)

    # 이미지에 대한 예측 수행
    predictions = model.predict(preprocessed_image)

    # 예측 결과를 해석하여 키워드 추출
    decoded_predictions = decode_predictions(predictions, top=3)  # 상위 3개 결과
    print('Predicted Keywords:')
    for i, (imagenet_id, label, score) in enumerate(decoded_predictions[0]):
        print(f"{i + 1}: {label} ({score * 100:.2f}%)")


def getsim():
    for filename in glob.glob('media/*'):
        predict_image_keywords(filename)
        print(filename)

    return "completed"
