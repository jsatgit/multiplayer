from flask_socketio import emit

def send_to_everyone_else(event, data):
    print _format_str('to everyone else', event, data)
    emit(event, data, broadcast=True, include_self=False)

def send_to_everyone(event, data):
    print _format_str('to everyone', event, data)
    emit(event, data, broadcast=True)

def send_back(event, data):
    print _format_str('to client', event, data)
    emit(event, data)

def _format_str(prefix, event, data):
    return '{prefix}: [{event}] => {data}'.format(
        prefix=prefix,
        event=event,
        data=data
    )
