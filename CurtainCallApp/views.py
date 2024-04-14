from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.shortcuts import redirect
from django.shortcuts import render, get_object_or_404
import CurtainCallApp.cookies as ck
from django.core.paginator import Paginator
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


# Create your views here.
class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")


# File Upload View
class FileUploadView(APIView):
    """
    파일 업로드 API
    """
    # @swagger_auto_schema(
    #     request_body=openapi.Schema(
    #         type=openapi.TYPE_OBJECT,
    #         properties={
    #             'file': openapi.Schema(type=openapi.TYPE_FILE, description='파일')
    #         }
    #     ),
    #     responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
    #         'href': openapi.Schema(type=openapi.TYPE_STRING, description='이동할 URL')
    #     })})
    permission_classes = [permissions.AllowAny]  # 모든 사용자가 접근 가능

    def post(self, request):  # request 객체를 통해 파일을 받아옴
        file = request.data.get('file')  # request 객체에서 파일을 가져옴
        File.objects.create(file=file)  # 파일을 DB에 저장
        Photo.objects.create(photo=file)
        # 등록에 성공했으면 CurtainCallApp/로 이동하여 등록된 URL을 확인하
        herf = '/CurtainCallApp/'
        return redirect(herf)


def index(request):
    file_list = Photo.objects.order_by('-id')
    context = {'file_list': file_list}
    return render(request, 'file_list.html', context)


def detail(request, file_id):
    file = get_object_or_404(Photo, pk=id)
    context = {'file': file}
    return render(request, 'file_detail.html', {'file': file})


def login(request):
    return render(request, 'login.html')


def main(request):
    return render(request, 'main.html')


class CookieView(APIView):
    permission_classes = [permissions.AllowAny]  # 모든 사용자가 접근 가능

    def post(self, request):
        href = '/CurtainCallApp/main/'
        response = redirect(href)
        response = ck.set_guest_id(request, response)
        guest_id = ck.get_guest_id(request)
        print(guest_id)
        return response


class StageViewSet(ModelViewSet):
    # permission_classes = [permissions.AllowAny]
    # authentication_classes = []
    queryset = Stage.objects.all()
    serializer_class = StageSerializer
    # copilot: redirect to href = '/CurtainCallApp/'


class Image(APIView):
    def post(self, request, format=None):
        photos = request.FILES.getlist('file')
        serializers = StageSerializer(data=photos, many=True)

        href = '/CurtainCallApp/'
        response = redirect(href)

        if serializers.is_valid():
            serializers.save()
            return response
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class requestImage(APIView):
    """
    이미지 리스트 요청 API
    """
    @swagger_auto_schema(
        responses={200: openapi.Schema(type=openapi.TYPE_OBJECT, properties={
            'imgeList': openapi.Schema(type=openapi.TYPE_STRING, description='이미지 리스트')
        })})
    def get(self, request):
        photos_list = Photo.objects.all()
        photos_list = list(photos_list)
        return render(request, 'four_pic_test.html', {'imgeList': photos_list})
        # request = {'imgeList': photos_list}
        # return Response(request, status=status.HTTP_200_OK)
