from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Budget


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
        newAB = Budget.objects.create(b_amount=request.data["b_amount"],
                                      ab_id=request.data["ab_id"],
                                      type_id=request.data["type_name"])
        newAB.save()
        return Response(0)

    def delete(self, request):
        data = request.GET
        if "b_id" in data.keys() and data["b_id"] != "":
            Budget.objects.filter(pk=data["b_id"]).first().delete()
            return Response(0)
        else:
            return Response(1)
