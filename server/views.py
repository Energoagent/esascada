from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import random
import json
import os
from esascada.settings import BASE_DIR

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
            'mainmenu': config.mainmenu,
            }
        )

def svg_utils(request):
    if request.method == 'GET':
        return render(request, 'svg_utils.html', 
            context = {
                'mainmenu': config.mainmenu,
                'contextmenu':{'convert': 'formmethod=get formaction=/convert/'}
                }
            )
    

def convert_dxf(request):
    pass

class Parameters(APIView):
    def get(self, request):
        if request.method == 'GET':
            if config.elementstatus == 'on':
                parameters = [{'id': 'cell_11_current', 'value': str(random.randint(100, 400))}]
            else:    
                parameters = [{'id': 'cell_11_current', 'value': 'off'}]
            return Response(parameters)

class Control(APIView):
    def get(self, request):
        if request.method == 'GET':
            reqJSON = json.loads(request.GET.get('controljson'))
            status = {'id':reqJSON['id'], 'status':reqJSON['command']}
            config.elementstatus = status['status']
            return Response(status)
