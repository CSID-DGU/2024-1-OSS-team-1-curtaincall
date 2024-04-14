#from django.http import HttpResponse
from rest_framework.response import Response
import hashlib
import base64

def set_guest_id(request, response):

    guest_id_seed = request.META.get('REMOTE_ADDR') + request.META.get('HTTP_USER_AGENT')
    guest_id = hashlib.sha256(guest_id_seed.encode()).hexdigest()
    #data = json.load(request.data)
    #guest_nickname = json.dumps(data['guest_nickname'], ensure_ascii=False).encode('utf-8').decode('unicode_escape')
    #guest_nickname = request.data.get('nickname')
    #print("this is nick: " + guest_nickname)
    #if guest_nickname is "":
    #    guest_nickname = "사진가" + guest_id[:5]
    response.set_cookie('guest_id', guest_id, max_age=60)
    #response.set_cookie('guest_nickname', base64.b64decode(guest_nickname.encode()), max_age=60)

    return response

def get_guest_id(request):
    guest_id = request.COOKIES.get('guest_id')
    return guest_id

#def get_guest_nickname(request):
#    data = request.COOKIES.get('guest_nickname')
#    guest_nickname = ''
#    if data:
#        guest_nickname = base64.b64decode(bytes(new_data, 'utf-8'))
#
#    return guest_nickname
