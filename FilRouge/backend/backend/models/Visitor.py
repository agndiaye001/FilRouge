# models.py
from django.db import models

class Visitor(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Visitor'
        verbose_name = "Visitor"
        verbose_name_plural = "Visitor"
