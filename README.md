# Installing Dependencies

## Server

1. From project root, `cd server`

2. Activate virtualenv

3. Install requirements in virtualenv: `pip install -r requirement.txt`

## Client

1. From project root, `cd webclient`

2. `npm install`

# Running

## Server

1. From project root, `cd server`

2. Create a config file named `config.py`

Place your Google Maps API key here and spawn location here:

```
GOOGLE_MAPS_API_KEY = 'your-api-key-here'
SPAWN = {
    'lat': 37.7749,
    'lng': -122.4194
}
```

3. Make sure virtualenv is activated

4. Run `make`

## Client

1. From project root, `cd webclient`

2. Load `index.html` in a browser

## Client (Dev)

1. Run `npm start` to use webpack to recompile after every change
