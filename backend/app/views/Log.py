import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Log


class LogView(APIView):
    def get(self, request):
        data = request.GET
        # print(data["u_id"])
        if "ab_id" in data.keys() and data["ab_id"] != "":
            logList = [{"l_id": l.l_id,
                        "time": l.time.strftime("%Y.%m.%d %H:%M:%S"),
                        "l_amount": l.l_amount,
                        "remark": l.remark,
                        "type_name": l.type_id}
                       for l in Log.objects.filter(ab_id=data["ab_id"])]
            return Response(logList)
        return Response(0)

    def post(self, request):
        newAB = Log.objects.create(l_amount=request.data["l_amount"],
                                   remark=request.data["remark"],
                                   time=datetime.datetime.now(),
                                   a_id=request.data["a_id"],
                                   ab_id=request.data["ab_id"],
                                   type_id=request.data["type_name"])
        newAB.save()
        return Response(0)

    def delete(self, request):
        data = request.GET
        if "l_id" in data.keys() and data["l_id"] != "":
            Log.objects.filter(pk=data["l_id"]).first().delete()
            return Response(0)
        else:
            return Response(1)
