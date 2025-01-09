from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Authentification requise
def Token(request):
    return Response({"message": "This is a protected resource"}, status=200)