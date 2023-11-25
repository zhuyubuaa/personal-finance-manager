from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import AccountBook, User


class AccountBookView(APIView):
    def get(self, request):
        data = request.GET
        # print(data["u_id"])
        if "u_id" in data.keys() and data["u_id"] != "":
            # for abid in u_ab:
            #     ab = AccountBook.objects.filter(pk=abid).first()
            #     abList.append({"ab_id": abid, "ab_name": ab.ab_name})
            abList = [{"ab_id": ab.id, "ab_name": ab.ab_name}
                      for ab in AccountBook.objects.filter(u_id=data["u_id"])]
            return Response(abList)
        return Response(0)

    def post(self, request):
        newAB = AccountBook.objects.create(ab_name=request.data["ab_name"], u_id=request.data["u_id"])
        newAB.save()
        return Response(0)

    def put(self, request):
        ab = AccountBook.objects.filter(pk=request.data["ab_id"]).first()
        newName = request.data["ab_name"]
        if newName != "":
            ab.ab_name = newName
        ab.save()
        return Response(0)

    def delete(self, request):
        data = request.GET
        if "ab_id" in data.keys() and data["ab_id"] != "":
            AccountBook.objects.filter(pk=data["ab_id"]).first().delete()
        return Response(0)
