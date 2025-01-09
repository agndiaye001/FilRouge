from rest_framework import viewsets
from ..models import Subscription
from ..serializers import SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated] 
