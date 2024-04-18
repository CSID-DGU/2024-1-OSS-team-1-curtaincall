import uuid
from django.db import models
# Create your models here.

class Stage_list(models.Model):
    app_label = 'Stage'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create(cls, host_val):
        return cls(host=host_val)


class User_list(models.Model):
    app_label = 'Stage'
    stage_id = models.ForeignKey(Stage_list, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.CharField(max_length=100)
    connect = models.BooleanField(default=True)
    sendImage = models.BooleanField(default=False)

    @classmethod
    def create(cls, stage_id_val, user_val):
        return cls(stage_id=stage_id_val, user=user_val)

    def change_sendImage(self):
        self.sendImage = True
        self.save()