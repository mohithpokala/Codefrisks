from django.contrib.auth.models import User
from django.db import models

class add_data(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE,)
    label = models.CharField(max_length=50)
    data = models.FileField()
    def __str__(self):
        return self.label
