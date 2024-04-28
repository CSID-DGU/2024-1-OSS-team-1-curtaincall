from rest_framework import serializers
from .models import *

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'

class StageSerializer(serializers.ModelSerializer):
    photo = PhotoSerializer(many=True, read_only=True)
    class Meta:
        model = Stage
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        photo_data = self.context['request'].FILES
        print(photo_data)
        stage = Stage.objects.create(**validated_data)
        for photo_data in photo_data.getlist('photo'):
            Photo.objects.create(stage=stage, photo=photo_data)
        return stage


