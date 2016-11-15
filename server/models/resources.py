from random import uniform
from collections import defaultdict

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

id_counter = defaultdict(int)

def generate_id(name):
    generated_id = id_counter.get(name)
    id_counter[name] += 1
    return generated_id


def create(num, name):
    return [
        {
            'id': generate_id(name),
            'name': name,
            'position': getRandPosition(),
            'amount': 100
        }
        for _ in xrange(num)
    ]


def create_all():
    return {
        'oil': create(10, 'oil'),
        'natural_gas': create(10, 'natural_gas'),
        'phosphorus': create(10, 'phosphorus'),
        'coal': create(10, 'coal')
    }
