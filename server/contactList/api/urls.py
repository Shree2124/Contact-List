from django.contrib import admin
from django.urls import path, include
from .views import AddNumber, DeleteNumber, GetAllNumbers, GetNumberById, SaveNumber

urlpatterns = [
    path("add-number",AddNumber),
    path("delete-number/<int:id>",DeleteNumber),
    path("edit-number/<int:id>",SaveNumber),
    path("get-all-numbers",GetAllNumbers),
    path("get-number/<int:id>",GetNumberById),
]