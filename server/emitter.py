from flask_socketio import emit

def send_to_everyone_else(event, data):
    print 'to everyone else: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True, include_self=False)

def send_to_everyone(event, data):
    print 'to everyone: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True)

def send_back(event, data):
    print 'to client: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data)
