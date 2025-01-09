# models/Workspace.py
from django.db import models
from .Users import Users
from .Admin import Admin

WORKSPACE_TYPE_CHOICES = [
    ('individual_office', 'Bureau individuel'),
    ('meeting_room', 'Salle de réunion'),
    ('open_space', 'Espace partagé'),
    ('shared_office', 'Bureau partagé'),
]

DURATIONS_CHOICES = [
    ('hour', 'Par heure'),
    ('half_day', 'Demi-journée'),
    ('full_day', 'Journée complète'),
]

WEEKDAY_CHOICES = [
    ('monday', 'Lundi'),
    ('tuesday', 'Mardi'),
    ('wednesday', 'Mercredi'),
    ('thursday', 'Jeudi'),
    ('friday', 'Vendredi'),
]

class Workspace(models.Model):
    idWorkspace=models.AutoField(primary_key=True)
    workspace_type = models.CharField(max_length=50, choices=WORKSPACE_TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)
    img = models.ImageField(upload_to='workspace_images/', null=True, blank=True)
    duration = models.CharField(max_length=50, choices=DURATIONS_CHOICES)
    day = models.CharField(max_length=20, choices=WEEKDAY_CHOICES)
    capacity = models.IntegerField()
    availability = models.BooleanField(default=True)
    id_user = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)
    id_admin = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True) 
    location = models.CharField(max_length=255)

    
    def save(self, *args, **kwargs):
        # Assigner une image par défaut si aucune n'est fournie
        if not self.img:
            self.img = self.get_default_image()
        super().save(*args, **kwargs)

    def get_default_image(self):
        """Retourne l'image par défaut en fonction du type de bureau."""
        default_images = {
            'individual_office': 'workspace_images/individual_office.jpeg',
            'meeting_room': 'workspace_images/meeting_room.jpeg',
            'open_space': 'workspace_images/open_space.jpeg',
            'shared_office': 'workspace_images/shared_office.jpeg',
        }
        return default_images.get(self.workspace_type, '')

    def get_capacity(self, capacities):
        """Retourne la capacité en fonction du type de bureau."""
        capacities = {
            'individual_office': 1,
            'shared_office': (2, 5),
            'meeting_room': 7,
            'open_space': 7,
        }
        capacity = capacities.get(self.workspace_type, 0)
        if isinstance(capacity, tuple):
            # Moyen (2,5) 7/2= 3.5
            return sum(capacity) // len(capacity) 
        return capacity

    class Meta:
        db_table = 'Workspace'
        verbose_name = "Workspace"
        verbose_name_plural = "Workspaces"

    def __str__(self):
        return f"{self.workspace_type} - Capacité: {self.capacity} - {self.duration}"


