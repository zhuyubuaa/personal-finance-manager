import datetime

from django.db import models

MAX_NAME_LENGTH = 50


# Create your models here.
class User(models.Model):
    u_id = models.IntegerField(primary_key=True)
    u_name = models.CharField(max_length=MAX_NAME_LENGTH)
    password = models.CharField(max_length=20)

    def __str__(self):
        return self.u_id


class Account(models.Model):
    a_id = models.AutoField(primary_key=True)
    a_name = models.CharField(max_length=MAX_NAME_LENGTH)
    u = models.ForeignKey(User, on_delete=models.CASCADE, default=21373074)
    remaining = models.FloatField()

    def __str__(self):
        return self.a_id


class AccountBook(models.Model):
    ab_id = models.AutoField(primary_key=True)
    ab_name = models.CharField(max_length=MAX_NAME_LENGTH)
    u = models.ForeignKey(User, on_delete=models.CASCADE, default=21373074)

    def __str__(self):
        return self.ab_id


class Type(models.Model):
    type_name = models.CharField(primary_key=True, max_length=MAX_NAME_LENGTH)
    is_out = models.BooleanField()

    def __str__(self):
        return self.type_name


class Log(models.Model):
    l_id = models.AutoField(primary_key=True)
    time = models.DateTimeField(default=datetime.datetime.now())
    l_amount = models.FloatField()
    remark = models.CharField(max_length=100, null=True)
    a = models.ForeignKey(Account, on_delete=models.CASCADE, default=1)
    ab = models.ForeignKey(AccountBook, on_delete=models.CASCADE, default=1)
    type = models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name="type_name", default="Dining")

    def __str__(self):
        return self.l_id


class Budget(models.Model):
    b_id = models.AutoField(primary_key=True)
    b_amount = models.FloatField()  # remaining
    type = models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name="type_name", default="Dining")
    ab = models.ForeignKey(AccountBook, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.b_id
