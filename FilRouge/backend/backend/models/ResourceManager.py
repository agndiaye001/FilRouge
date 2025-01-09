from django.db import models
from .Admin import Admin
from .Workspace import Workspace



class ResourceManager(models.Model):
    idResourceManager=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    idWorkspace = models.ForeignKey(Workspace, on_delete=models.SET_NULL, null=True, blank=True)
    idAdmin = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'ResourceManager'
        verbose_name = "ResourceManager"
        verbose_name_plural = "ResourceManager"
