from rest_framework.views import APIView, Request
from rest_framework.response import Response
from app.models import User
from app.serializer import UserSerializer


class UserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        # newUser = User(u_id=request.data.get('id'),
        #                u_name=request.data.get('name'),
        #                password=request.data.get('password'))
        # newUser = User(u_id=1,
        #                u_name="222",
        #                password="3333")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def get(self, request):
        data = User.objects.filter(u_id=1).first()
        detail = [{"u_id": data.u_id, "password": data.password}]
        return Response(detail)
