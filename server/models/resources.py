from random import uniform

COQUITLAM = {
    'lat': 49.2838,
    'lng': -122.7932
}

def getRandPosition():
    lat_radius = 0.002
    lng_radius = 0.003
    diff_lat = uniform(-lat_radius, lat_radius)
    diff_lng = uniform(-lng_radius, lng_radius)
    return {
        'lat': COQUITLAM.get('lat') + diff_lat,
        'lng': COQUITLAM.get('lng') + diff_lng
    }

def create(num):
    return [{'position': getRandPosition()} for _ in xrange(num)]


def create_all():
    return {
        'oil': create(10),
        'natural_gas': create(10),
        'phosphorus': create(10),
        'coal': create(10)
    }
