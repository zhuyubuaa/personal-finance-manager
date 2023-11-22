from django.contrib import admin
from django.urls import path, include
from app.views import User

urlpatterns = [
    path("user", User.UserView.as_view()),
    path("login",User.UserLogin.as_view())
]