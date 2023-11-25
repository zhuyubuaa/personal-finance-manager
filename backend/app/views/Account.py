from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Account


class AccountView(APIView):
    def get(self, request):
        data = request.GET
        # print(data["u_id"])
        if "u_id" in data.keys() and data["u_id"] != "":
            # for aid in u_accounts:
            #     a = Account.objects.filter(pk=aid.a_id_id).first()
            #     accountList.append({"a_id": aid, "a_name": a.a_name, "remaining": a.remaining})
            accountList = [{"a_id": account.a_id, "a_name": account.a_name, "remaining": account.remaining}
                           for account in Account.objects.filter(u_id=data["u_id"])]
            return Response(accountList)
        return Response(0)

    def post(self, request):
        newAccount = Account.objects.create(a_name=request.data["a_name"],
                                            remaining=request.data["remaining"],
                                            u_id=request.data["u_id"])
        newAccount.save()
        return Response(0)

    def put(self, request):
        acc = Account.objects.filter(pk=request.data["a_id"]).first()
        newName = request.data["a_name"]
        newRemaining = request.data["remaining"]
        if newName != "":
            acc.a_name = newName
        if newRemaining != "":
            acc.remaining = newRemaining
        acc.save()
        return Response(0)

    def delete(self, request):
        data = request.GET
        if "a_id" in data.keys() and data["a_id"] != "":
            Account.objects.filter(pk=data["a_id"]).first().delete()
        return Response(0)
