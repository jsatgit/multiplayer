from app import socketio
from flask import request
from game import take_resource
from game import get_person
from emitter import send_to_everyone

RESOURCE = 'resource'
TAKE = 'take'

@socketio.on(RESOURCE)
def on_resource(req):
    person = get_person(request.sid)
    if req.get('action') == TAKE:
        resource_name = req.get('resource_name')
        resource_id = req.get('resource_id')
        resource_remaining = take_resource(resource_name, resource_id)
        send_to_everyone(RESOURCE, {
            'action': TAKE,
            'resource_name': resource_name,
            'resource_id': resource_id,
            'amount': resource_remaining
        })
