from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Type


class TypeView(APIView):
    def get(self, request):
        income_typeList = [{"typeName": t.type_name}
                           for t in Type.objects.filter(is_out=0)]
        expense_typeList = [{"typeName": t.type_name}
                            for t in Type.objects.filter(is_out=1)]
        return Response({"income": income_typeList, "expense": expense_typeList})

