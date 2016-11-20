from app import socketio
from flask import request
from game import take_resource
from game import get_resource
from game import get_person
from emitter import send_to_everyone
from math import sqrt

RESOURCE = 'resource'
TAKE = 'take'

def distance(position1, position2):
    latDiff = position1.get('lat') - position2.get('lat')
    lngDiff = position1.get('lng') - position2.get('lng')
    return sqrt(latDiff*latDiff + lngDiff*lngDiff)

def close(position1, position2):
    return distance(position1, position2) < 0.00009

def canTakeResource(person, resource):
    return close(person.position, resource.get('position'))


@socketio.on(RESOURCE)
def on_resource(req):
    person = get_person(request.sid)
    if req.get('action') == TAKE:
        resource_name = req.get('resource_name')
        resource_id = req.get('resource_id')
        resource = get_resource(resource_name, resource_id)
        if canTakeResource(person, resource):
            resource_remaining = take_resource(resource)
            send_to_everyone(RESOURCE, {
                'action': TAKE,
                'resource_name': resource_name,
                'resource_id': resource_id,
                'amount': resource_remaining
            })
