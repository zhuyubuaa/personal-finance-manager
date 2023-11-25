from django.contrib import admin
from django.urls import path, include
from app.views import User, Account, AccountBook, Type, Budget, Log

urlpatterns = [
    path("user", User.UserView.as_view()),
    path("login",User.UserLogin.as_view()),
    path("account", Account.AccountView.as_view()),
    path("accountbook", AccountBook.AccountBookView.as_view()),
    path("type", Type.TypeView.as_view()),
    path("budget", Budget.BudgetView.as_view()),
    path("log", Log.LogView.as_view())
]