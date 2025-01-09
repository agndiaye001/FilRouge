from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework import status

@api_view(['POST'])
def Login(request):
    # Récupération des données du formulaire (username et password)
    username = request.data.get('username')
    password = request.data.get('password')

    # Authentifier l'utilisateur
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Générer un refresh token et un access token
        refresh = RefreshToken.for_user(user)
        # Retourner les tokens au client
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'detail': "Login successful"
        }, status=status.HTTP_200_OK)
    else:
        # Retourner une erreur si les identifiants sont invalides
        return Response({
            'detail': "Invalid credentials"
        }, status=status.HTTP_400_BAD_REQUEST)
