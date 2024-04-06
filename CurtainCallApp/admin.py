from django.contrib import admin
from .models import *
# Register your models here.

#class FileAdmin(admin.ModelAdmin):
#   search_fields = ['file']

admin.site.register(Stage)
admin.site.register(Photo)