from bootstrap import socketio
from app import flask_app

if __name__ == '__main__':
    try:
        socketio.run(flask_app, host='', port=5000)
    except KeyboardInterrupt:
        pass

