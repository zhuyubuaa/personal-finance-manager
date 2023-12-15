from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Budget, Log


class BudgetView(APIView):
    def get(self, request):
        data = request.GET
        # print(data["u_id"])
        if "ab_id" in data.keys() and data["ab_id"] != "":
            budgetList = [{"b_id": b.b_id, "type_name": b.type_id, "b_amount": b.b_amount}
                          for b in Budget.objects.filter(ab_id=data["ab_id"])]
            return Response(budgetList)
        return Response(0)

    def post(self, request):
        b_type = request.data["type_name"]
        b_ab_id = request.data["ab_id"]
        budget = Budget.objects.filter(ab_id=b_ab_id, type_id=b_type)
        info = 0
        if budget:
            info = 1
        else:
            set_amount = request.data["b_amount"]
            b_type_logs = Log.objects.filter(ab_id=b_ab_id, type_id=b_type)
            if b_type_logs:
                for log in b_type_logs:
                    set_amount += log.l_amount
            newAB = Budget.objects.create(b_amount=set_amount,
                                          ab_id=b_ab_id,
                                          type_id=b_type)
            newAB.save()
        return Response(info)

    def delete(self, request):
        data = request.GET
        if "b_id" in data.keys() and data["b_id"] != "":
            Budget.objects.filter(pk=data["b_id"]).first().delete()
            return Response(0)
        else:
            return Response(1)
