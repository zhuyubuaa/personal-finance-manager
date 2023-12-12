import random
import hashlib

from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import User
from app.serializer import UserSerializer


def get_md5(key, data):
    salt = str(key)
    obj = hashlib.md5(salt.encode('utf-8'))  # id is key
    obj.update(data.encode('utf-8'))
    result = obj.hexdigest()
    return result[0:17]


class UserView(APIView):
    serializer_class = UserSerializer

    def post(self, request):  # create new user
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
        tmpPwd = get_md5(new_id, str(request.data["password"]))  # hash
        serializer = UserSerializer(data={"u_id": new_id,
                                          "u_name": request.data["u_name"],
                                          "password": tmpPwd})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(new_id)

    def put(self, request):  # update password/username
        user = User.objects.filter(u_id=request.data["u_id"]).first()
        newPassword = request.data["password"]
        newUserName = request.data["u_name"]
        if newPassword != "":
            newPassword = get_md5(user.u_id, newPassword)
            user.password = newPassword
        if newUserName != "":
            user.u_name = newUserName
        user.save()
        return Response(0)

    # def get(self, request):
    #     data = User.objects.get(u_id=1)
    #     if data:
    #         detail = {"u_id": data.u_id, "password": data.password}
    #         return Response(detail)
    #     return Response(0)


class UserLogin(APIView):
    def post(self, request):
        u_id = request.data["u_id"]
        user = User.objects.filter(u_id=u_id).first()
        info = {"value": 0, "u_name": ""}
        if user:
            password = get_md5(u_id, str(request.data["password"]))
            if user.password == password:
                info["u_name"] = user.u_name
            else:
                info["value"] = 1  # password not match
        else:
            info["value"] = 2  # user not found
        return Response(info)



