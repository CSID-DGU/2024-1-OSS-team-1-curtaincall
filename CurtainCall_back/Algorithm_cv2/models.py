from django.db import models

class TestModel(models.Model):
    tuple = models.CharField(max_length=100)
