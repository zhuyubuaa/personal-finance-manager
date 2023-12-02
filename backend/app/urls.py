from django.contrib import admin
from django.urls import path, include
from app.views import User, Account, AccountBook, Type, Budget, Log, Query

urlpatterns = [
    path("user", User.UserView.as_view()),
    path("login",User.UserLogin.as_view()),
    path("account", Account.AccountView.as_view()),
    path("accountbook", AccountBook.AccountBookView.as_view()),
    path("type", Type.TypeView.as_view()),
    path("budget", Budget.BudgetView.as_view()),
    path("log", Log.LogView.as_view()),
    path("query", Query.QueryMonthDetailView.as_view()),
    path("out_order", Query.QueryMonthOutOrder.as_view()),
    path("in_order", Query.QueryMonthInOrder.as_view()),
    path("out_detail_order", Query.QueryMonthDetailOutOrderView.as_view()),
    path("in_detail_order", Query.QueryMonthDetailInOrderView.as_view()),
]

# {
# "year": 2023,
# "month": 11,
# "ab_id": 1
# }