from rest_framework import viewsets
from ..models.Transaction import Transaction
from ..serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
