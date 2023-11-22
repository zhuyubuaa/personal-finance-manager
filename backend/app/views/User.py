import random

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

        # serializer = UserSerializer(data=request.data)
        new_id = random.randint(10000, 99999)
        while User.objects.filter(u_id=new_id).first():
            new_id = random.randint(10000, 99999)
        serializer = UserSerializer(data={"u_id": new_id,
                                          "u_name": request.data["u_name"],
                                          "password": request.data["password"]})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(new_id)

    def get(self, request):
        data = User.objects.get(u_id=1)
        if data:
            detail = {"u_id": data.u_id, "password": data.password}
            return Response(detail)
        return Response(0)


class UserLogin(APIView):
    def post(self, request):
        id = request.data["u_id"]
        password = request.data["password"]
        user = User.objects.filter(u_id=id).first()
        if user:
            if user.password == password:
                return Response(0)
            else:
                return Response("password not match")  # password not match
        else:
            return Response("user not found")  # user not found
