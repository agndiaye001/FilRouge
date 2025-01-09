# views.py
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def Logout(request):
    logout(request)
    return Response({"detail": "Logout successful"}, status=200)
