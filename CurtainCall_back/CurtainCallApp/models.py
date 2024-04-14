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
    """
    DB 에서 사진 리스트를 가져옴
    """
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    photo = models.FileField()
    def __str__(self):
        """
        return photo name list
        """
        return self.photo.name