from django.db import models


# Create your models here.

class File(models.Model):
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.file.name

class Stage(models.Model):
    host = models.CharField(max_length=20)
    #user

class Photo(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    photo = models.FileField()
    def __str__(self):
        return self.photo.name