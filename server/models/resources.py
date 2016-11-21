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

def create(num, ResourceClass):
    ResourceClass.create()
    for _ in xrange(num):
        ResourceClass.insert({
            'position': getRandPosition(),
            'amount': 5
        })

def create_all():
    create(10, Oil)
    create(10, NaturalGas)
    create(10, Phosphorus)
    create(10, Coal)

class Resource(object):
    _rows = None
    _id_counter = 0
    name = None

    @classmethod
    def create(cls):
        cls._rows = {}

    @classmethod
    def get(cls, resource_id):
        return cls._rows[resource_id]

    @classmethod
    def insert(cls, resource):
        # TODO mutation alert
        resource.update({
            'id': cls._generate_id(),
            'name': cls.name
        })
        cls._rows[resource.get('id')] = resource

    @classmethod
    def delete(cls, resource_id):
        del cls._rows[resource_id]

    @classmethod
    def rows(cls, ):
        return cls._rows

    @classmethod
    def _generate_id(cls):
        current_id = cls._id_counter
        cls._id_counter += 1
        return current_id

def use_resource(resource):
    newAmount = resource.get('amount') - 1
    resource['amount'] = newAmount
    if newAmount == 0:
        ResourceClass = nameToResourceClass.get(resource.get('name'))
        ResourceClass.delete(resource.get('id'))
    return newAmount

class Oil(Resource):
    name = 'oil'

class NaturalGas(Resource):
    name = 'natural_gas'

class Phosphorus(Resource):
    name = 'phosphorus'

class Coal(Resource):
    name = 'coal'

# TODO consider metaclasses
nameToResourceClass = {
    'oil': Oil,
    'natural_gas': NaturalGas,
    'phosphorus': Phosphorus,
    'coal': Coal
}
