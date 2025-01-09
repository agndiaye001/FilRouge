# models/Users.py
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

ROLE_CHOICES=[
    ('admin', 'Admin'),
    ('manager', 'ResourceManager'),
    ('prestataire', 'Prestataire'),
    ('visiteur', 'Visiteur'),
    ('user', 'Utilisateur'),
]

class Users(AbstractUser):
    userId = models.AutoField(primary_key=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    name = models.CharField(max_length=50, null=False, blank=False)
    #email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    activeSubscription = models.BooleanField(default=False)


    # Ajout de related_name pour éviter les conflits avec auth.User
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Modifie la relation inverse
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions_set',  # Modifie la relation inverse
        blank=True
    )


    def __str__(self):
         return f"{self.name} - {self.role} "
    
    class Meta:
        db_table = 'Users'
        verbose_name = "Utilisateur"
        verbose_name_plural = "Utilisateurs"
