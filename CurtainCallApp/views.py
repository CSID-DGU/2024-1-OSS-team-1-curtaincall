from django.shortcuts import render

# Create your views here.
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import File
from django.http import HttpResponse

# Create your views here.
class TestView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response("Swagger 연동 테스트")


# File Upload View
class FileUploadView(APIView):
    permission_classes = [permissions.AllowAny]  # 모든 사용자가 접근 가능

    def post(self, request):  # request 객체를 통해 파일을 받아옴
        file = request.data['file']
        File.objects.create(file=file)  # 파일을 DB에 저장
        return Response("파일 업로드 성공")
def index(request):
    return HttpResponse("안녕하세요 커튼 콜에 오신 것을 환영합니다")