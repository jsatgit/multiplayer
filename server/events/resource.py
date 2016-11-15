from app import socketio
from flask import request
from game import take_resource 
from emitter import send_to_everyone

RESOURCE = 'resource'
TAKE = 'take'

@socketio.on(RESOURCE)
def on_resource(request):
    person = get_person(request.sid)
    if request.action == TAKE: 
        resource_remaining = take_resource(request.resource_name)
        send_to_everyone(RESOURCE, {
            'action': TAKE, 
            'resource_remaining': resource_remaining
        })
