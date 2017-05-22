from app import socketio
from flask import request
from game import get_resource
from game import get_person
from models.resources import use_resource
from emitter import send_to_everyone

RESOURCE = 'resource'
TAKE = 'take'

@socketio.on(RESOURCE)
def on_resource(req):
    person = get_person(request.sid)
    if req.get('action') == TAKE:
        resource_name = req.get('resource_name')
        resource_id = req.get('resource_id')
        resource = get_resource(resource_name, resource_id)
        if person.can_take_resource(resource):
            resource_remaining = use_resource(resource)
            person.add_to_inventory({ resource.get('name'): 1 })
            send_to_everyone(RESOURCE, {
                'action': TAKE,
                'resource_name': resource_name,
                'resource_id': resource_id,
                'amount': resource_remaining,
                'person_id': person.id,
                'inventory_gain': 1
            })
