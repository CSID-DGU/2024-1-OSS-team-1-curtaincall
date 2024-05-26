from django.apps import AppConfig

class AlgorithmCv2Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Algorithm_cv2'

    def ready(self):
        from .sim_print import load_model
        load_model()
