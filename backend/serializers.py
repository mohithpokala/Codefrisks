from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.models import add_data
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs={'password':{'write_only':True,'required':True}}
    

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = add_data
        fields = ('username','label','file')


