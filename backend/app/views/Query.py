from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from app.models import Log


def queryMonthIncome(y, m):
    return Log.objects.filter(time__year=y, time__month=m, type__is_out=0).aggregate(total=Sum('l_amount'))['total']

def queryMonthOutcome(y, m):
    return Log.objects.filter(time__year=y, time__month=m, type__is_out=1).aggregate(total=Sum('l_amount'))['total']


# class QueryMonthView(APIView):
#     def get(self, request):
