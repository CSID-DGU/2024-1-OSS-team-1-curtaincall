from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
import Algorithm_cv2.sim_print as sp
from rest_framework.response import Response

class AlgoView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response(sp.getsim(stage_id=request.user.stage_uuid_id), status=status.HTTP_200_OK)
# Create your views here.
