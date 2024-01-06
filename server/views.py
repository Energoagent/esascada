from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
#from rest_framework.renderers import JSONRenderer
#import requests
#from requests.exceptions import HTTPError
import json
import random

from server import config

def main(request):
    return render(request, 'main.html', 
        context = {
            'data_from_view': 'ESA SCADA',
            'mainmenu': config.mainmenu,
            }
        )
        
def switchgear_10(request):
    return render(request, 'switchgear_10.html', 
        context = {
            'data_from_view': 'ESA SCADA',
            'mainmenu': config.mainmenu,
            }
        )
     
class Parameters(APIView):
    def get(self, request):
        if request.method == 'GET':
            parameters = [{'id':'cell_01_current', 'value': str(random.randint(100, 400))}]
            return Response(parameters)

class Control(APIView):
    def get(self, request):
        if request.method == 'GET':
            status = {'id':'cell_01', 'value':'off'}
            print('STATUS:', status);
            return Response(status)
