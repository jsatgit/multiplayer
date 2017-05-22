from app import socketio
from flask import request
from game import get_person
from game import get_person_by_id
from emitter import send_to_everyone

UPDATE_POSITON = 'update_position'
MOVE = 'move'
TRADE = 'trade'

@socketio.on(MOVE)
def on_move(options):
    person = get_person(request.sid)
    if options.get('direction'):
        person.move_direction(options.get('direction'))
    elif options.get('step'):
        person.move_step(options.get('step'))
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(TRADE)
def on_trade(options):
    seller = get_person(request.sid)
    buyer = get_person_by_id(options.get('to'))
    items = options.get('items')
    if seller.can_remove_from_inventory(items):
        seller.remove_from_inventory(items)
        buyer.add_to_inventory(items)
        send_to_everyone(TRADE, {
            'from': seller.id,
            'to': buyer.id,
            'items': items
        })
    
