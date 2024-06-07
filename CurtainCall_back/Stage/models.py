import uuid
from django.db import models
# Create your models here.

class Stage_list(models.Model):
    app_label = 'Stage'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    host = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    sort = models.BooleanField(default=False)
    data = models.JSONField(default=dict, blank=True)
    status = models.CharField(max_length=20, default='READY')

    @classmethod
    def create(cls, host_val):
        return cls(host=host_val)

    def status_sorting(self):
        self.status = 'SORTING'
        self.save()

    def status_complete(self, the_dict):
        self.data = the_dict
        self.status = 'COMPLETE'
        self.save()

    def get_status(self):
        return self.status


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

    def set_send_image_flag(self):
        self.sendImage = True
        self.save()