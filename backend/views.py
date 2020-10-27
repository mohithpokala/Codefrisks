from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from backend.serializers import UserSerializer,DataSerializer
from backend.models import add_data
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser, FormParser

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes = [IsAuthenticated]

@csrf_exempt
def create_user(request):
    validated_data=JSONParser().parse(request)
    if(validated_data['password']!=validated_data['password2']):
        return JsonResponse("Passwords donot match",safe=False)
    elif(User.objects.filter(email=validated_data['email']).exists()):
        return JsonResponse("There exists an account with this email",safe=False)
    elif(User.objects.filter(username=validated_data['username']).exists()):
        return JsonResponse("There exists an account with this username",safe=False)
    else:
        try:
            new_data={}
            new_data['username']=validated_data['username']
            new_data['password']=validated_data['password']
            new_data['email']=validated_data['email']
        except:
            return JsonResponse("here",safe=False)
        user_serializer=UserSerializer(data=new_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("success",safe=False)
        return JsonResponse("Invalid credentials",safe=False)
class DataUpload(viewsets.ModelViewSet):
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = DataSerializer
    @csrf_exempt
    def post(request, *args, **kwargs):
        label=request.POST['label']
        username=request.POST['username']
        your_file = request.FILES['data']
        add_data.objects.create( username=username,label=label,data=your_file)
        return JsonResponse("success",safe=False)
 
    @csrf_exempt
    def view_files(request):
        data = request.POST
        your_files=add_data.objects.filter(username=data['username'])
        serializer = DataSerializer(your_files, many=True)
        return JsonResponse(serializer.data, safe=False)


    