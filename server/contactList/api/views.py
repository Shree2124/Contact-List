from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ContactList
from rest_framework import status
from .serializers import ContactListSerializer
from django.http import JsonResponse

# Create your views here.

@api_view(['GET'])
def GetAllNumbers(request):
    obj = ContactList.objects.all()
    serializer = ContactListSerializer(obj, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def AddNumber(request):
    data=request.data
    serializer = ContactListSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success"},status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def DeleteNumber(request, id):
    try:
        contact = ContactList.objects.get(id=id)
        contact.delete()
        return Response({"Contact Number deleted successfully"}, status=status.HTTP_200_OK)    
    except ContactList.DoesNotExist:
        return Response({'error': 'Contact not found'}, status=status.HTTP_404_NOT_FOUND)
    
        
@api_view(["GET"])
def GetNumberById(request, id):
    try:
        contact = ContactList.objects.get(id=id)
    except ContactList.DoesNotExist:
        return Response({'error': 'Contact Number not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ContactListSerializer(contact)
    return Response(serializer.data)

@api_view(["PUT"])
def SaveNumber(request, id):
    try:
        instance = ContactList.objects.get(pk=id)
    except ContactList.DoesNotExist:
        return Response({"error": "Contact Number does not exist"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ContactListSerializer(instance,data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"Updated successfully"}, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)