from django.db import models
from .Reservation import Reservation

class Transaction(models.Model):
    idTransaction=models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    transaction_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending')
    
    def __str__(self):
        return f"Transaction pour {self.reservation.user.name} à la date {self.transaction_date}"
    
    class Meta:
        db_table = 'Transaction'
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"