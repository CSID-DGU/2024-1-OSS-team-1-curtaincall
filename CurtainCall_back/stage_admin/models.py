import uuid
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)
# Create your models here.

class Stage_list(models.Model):
    app_label = 'stage_admin'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.CharField(max_length=100)

    @classmethod
    def create(cls, id_val, host_val):
        return cls(id=id_val, host=host_val)

    def __str__(self):
        return str(self.id)

class User_list(models.Model):
    app_label = 'stage_admin'
    stage_id = models.ForeignKey(Stage_list, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.CharField(max_length=100)

    @classmethod
    def create(cls,stage_id_val,user_val):
        id = uuid.uuid4()
        return cls(stage_id=stage_id_val, id=id, user=user_val)
