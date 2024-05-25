from django.db import models
from Stage.models import Stage_list
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self, user_email, password, **kwargs):
        if not user_email:
            raise ValueError('Users must have an email address')
        print("Hello")
        print(user_email)
        user = self.model(
            user_email=user_email,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user



class User(AbstractBaseUser):
    app_label = 'accounts'
    id = models.CharField(max_length=100)
    stage_uuid = models.ForeignKey(Stage_list, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=30, unique=True, null=False, blank=False, primary_key=True)
    user_nickname = models.CharField(max_length=100)
    user_ready = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    USER_ID_FIELD = 'username'

    print('User model created')

    @classmethod
    def create(cls, stage_id_val, user_val):
        return cls(stage_id=stage_id_val, user=user_val)

    def set_send_image_flag(self):
        self.sendImage = True
        self.save()
# Create your models here.
