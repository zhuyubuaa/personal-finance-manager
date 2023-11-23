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
    remaining = models.FloatField()

    def __str__(self):
        return self.a_id


class AccountBook(models.Model):
    ab_id = models.AutoField(primary_key=True)
    ab_name = models.CharField(max_length=MAX_NAME_LENGTH)

    def __str__(self):
        return self.ab_id


class Log(models.Model):
    l_id = models.AutoField(primary_key=True)
    time = models.DateTimeField()
    l_amount = models.FloatField()
    remark = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.l_id


class Budget(models.Model):
    b_id = models.IntegerField(primary_key=True)
    b_amount = models.FloatField()

    def __str__(self):
        return self.b_id


class Type(models.Model):
    type_name = models.CharField(primary_key=True, max_length=MAX_NAME_LENGTH)
    is_out = models.BooleanField()

    def __str__(self):
        return self.type_name


class UserAccount(models.Model):
    u_id = models.ForeignKey(User, on_delete=models.CASCADE)
    a_id = models.ForeignKey(Account, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("u_id", "a_id")

    def __str__(self):
        return self.u_id, self.a_id


class UserAB(models.Model):
    u_id = models.ForeignKey(User, on_delete=models.CASCADE)
    ab_id = models.ForeignKey(AccountBook, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("u_id", "ab_id")

    def __str__(self):
        return self.u_id, self.ab_id


class ABLog(models.Model):
    ab_id = models.ForeignKey(AccountBook, on_delete=models.CASCADE)
    l_id = models.ForeignKey(Log, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("l_id", "ab_id")

    def __str__(self):
        return self.ab_id, self.l_id


class BudgetManage(models.Model):
    ab_id = models.ForeignKey(AccountBook, on_delete=models.CASCADE)
    b_id = models.ForeignKey(Budget, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("b_id", "ab_id")

    def __str__(self):
        return self.ab_id, self.b_id


class BudgetType(models.Model):
    b_id = models.ForeignKey(Budget, on_delete=models.CASCADE)
    type_name = models.ForeignKey(Type, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("b_id", "type_name")

    def __str__(self):
        return self.b_id, self.type_name


class LogType(models.Model):
    l_id = models.ForeignKey(Log, on_delete=models.CASCADE)
    type_name = models.ForeignKey(Type, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("l_id", "type_name")

    def __str__(self):
        return self.l_id, self.type_name
