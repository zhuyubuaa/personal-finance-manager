from django.contrib import admin
from django.urls import path, include
from app.views import User

urlpatterns = [
    path("User", User.UserView.as_view()),
]