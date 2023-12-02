from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, QuerySet
from app.models import Log


def queryMonthSet(y, m, ab_id):
    return Log.objects.filter(time__year=y, time__month=m, ab_id=ab_id)


def calSum(data: QuerySet):
    return data.aggregate(total=Sum('l_amount'))['total']


def query_month_detail(month_data: QuerySet):
    day = None
    date = None
    result = []
    logs = []
    month_in = 0
    month_out = 0
    day_sum = 0
    for o in month_data:
        if day != o.time.day:
            if logs:
                day_data = {"date": date,
                            "logs": logs,
                            "total": day_sum}
                logs = []
                day_sum = 0
                result.append(day_data)
            date = o.time.strftime("%m.%d")
            day = o.time.day
        logs.append({"type_name": o.type_id,
                     "l_amount": o.l_amount,
                     "remark": o.remark,
                     "l_id": o.l_id})  # for detail query
        day_sum += o.l_amount
        if o.l_amount < 0:
            month_out += o.l_amount
        else:
            month_in += o.l_amount
    day_data = {"date": date,
                "logs": logs,
                "total": day_sum}  # last day
    result.append(day_data)
    month_sum = month_in + month_out
    return Response({"result_list": result,
                     "month_in": month_in,
                     "month_out": month_out,
                     "month_sum": month_sum})


class QueryMonthDetailView(APIView):
    def post(self, request):  # input y, m
        month_data = queryMonthSet(request.data["year"], request.data["month"], request.data["ab_id"])
        return query_month_detail(month_data)


class QueryMonthInOrder(APIView):
    def post(self, request):
        month_data = queryMonthSet(request.data["year"], request.data["month"], request.data["ab_id"])
        in_data = month_data.filter(type__is_out=0)
        cnt = {}
        data_list = []
        for o in in_data:
            name = o.type_id
            data_list.append({"type_name": o.type_id, "time": o.time.strftime("%m.%d"), "amount": o.l_amount})
            if cnt.get(name):
                cnt[name] = cnt[name] + o.l_amount
            else:
                cnt[name] = o.l_amount
        ordered_detail = sorted(data_list, key=lambda x: -x["amount"])
        ordered_type_pair = sorted(cnt.items(), key=lambda x: -x[1])
        ordered_type_list = []
        for e in ordered_type_pair:
            ordered_type_list.append({"type_name": e[0], "amount": e[1]})
        return Response({"ordered_type_list": ordered_type_list,
                         "ordered_detail": ordered_detail})


class QueryMonthOutOrder(APIView):
    def post(self, request):
        month_data = queryMonthSet(request.data["year"], request.data["month"], request.data["ab_id"])
        out_data = month_data.filter(type__is_out=1)
        cnt = {}
        data_list = []
        for o in out_data:
            name = o.type_id
            data_list.append({"type_name": name, "time": o.time.strftime("%m.%d"), "amount": o.l_amount})
            if cnt.get(name):
                cnt[name] = cnt[name] + o.l_amount
            else:
                cnt[name] = o.l_amount
        ordered_detail = sorted(data_list, key=lambda x: x["amount"])
        ordered_type_pair = sorted(cnt.items(), key=lambda x: x[1])
        ordered_type_list = []
        for e in ordered_type_pair:
            ordered_type_list.append({"type_name": e[0], "amount": e[1]})
        return Response({"ordered_type_list": ordered_type_list,
                         "ordered_detail": ordered_detail})


class QueryMonthDetailInOrderView(APIView):
    def post(self, request):  # input y, m
        month_data = queryMonthSet(request.data["year"], request.data["month"], request.data["ab_id"])
        in_data = month_data.filter(type__is_out=0)
        data_list = []
        for e in in_data:
            data_list.append({"type_name": e.type_id, "time": e.time.strftime("%m.%d"), "amount": e.l_amount})
        ordered = sorted(data_list, key=lambda x: -x["amount"])
        return Response(ordered)


class QueryMonthDetailOutOrderView(APIView):
    def post(self, request):  # input y, m
        month_data = queryMonthSet(request.data["year"], request.data["month"], request.data["ab_id"])
        out_data = month_data.filter(type__is_out=1)
        data_list = []
        for e in out_data:
            data_list.append({"type_name": e.type_id, "time": e.time.strftime("%m.%d"), "amount": e.l_amount})
        ordered = sorted(data_list, key=lambda x: x["amount"])
        return Response(ordered)


class QueryMonthAccountDetail(APIView):
    def post(self, request):
        month_data = Log.objects.filter(time__year=request.data["year"],
                                        time__month=request.data["month"],
                                        a_id=request.data["a_id"])
        return query_month_detail(month_data)
