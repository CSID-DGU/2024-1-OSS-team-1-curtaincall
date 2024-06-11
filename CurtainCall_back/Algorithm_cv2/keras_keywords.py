
from keras.applications.efficientnet_v2 import EfficientNetV2B2, preprocess_input, decode_predictions
from keras.preprocessing import image
import numpy as np

from .image_loader import load_image, prepare_image

# 사전 훈련된 MobileNetV2 모델 로드
model = None

def load_model():
    global model
    model = EfficientNetV2B2(weights='imagenet')

def get_single_keyword(image):
    # 이미지 로드 및 전처리
    preprocessed_image = load_tensor(image)

    # 이미지에 대한 예측 수행
    predictions = model.predict(preprocessed_image)

    # 예측 결과를 해석하여 키워드 추출
    decoded_predictions = decode_predictions(predictions, top=2)  # 상위 3개 결과
    label_score = []
    for i, (imagenet_id, label, score) in enumerate(decoded_predictions[0]):
        label_score.append((label, score))
    print("키워드 비교!")
    print(label_score)
    return label_score

def load_tensor(img):
    prepared_image = prepare_image(img, width=260, height=260, convert_mode='RGB')
    img_array = image.img_to_array(prepared_image)
    img_array_expanded_dims = np.expand_dims(img_array, axis=0)
    return preprocess_input(img_array_expanded_dims)
