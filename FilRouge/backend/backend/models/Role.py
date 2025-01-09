# models/Users.py
from django.db import models

class Role (models.Model):
    roleId = models.AutoField(primary_key=True)
    role = models.CharField(max_length=50)

    def __str__(self):
        return self.role
    class Meta:
        db_table = 'Role'
        verbose_name = "Role"
        verbose_name_plural = "Role"
