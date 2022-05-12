import os
import requests

degg_metadata = {
    'name': '',
    'description': '',
    'image': '',
    'attributes': [
        {'trait_type': 'background', 'value': ''},
        {'trait_type': 'color', 'value': ''},
        {'trait_type': 'pattern', 'value': ''},
        {'trait_type': 'rare_trait', 'value': ''},
    ],
}

def construct_metadata(filename='shadowy-swirl-red-egg-uncommon.png'):
    name = filename[:-4]
    current_degg = degg_metadata
    current_degg.name = name
    for attr in current_degg.attributes:
        pass

def upload_to_pinata(filepath):
    # https://docs.pinata.cloud/api-pinning/pin-file
    pinata_url = 'https://api.pinata.cloud'
    endpoint = '/pinning/pinFileToIPFS'

    filename = filepath.split('/')[-1:][0]
    headers = {
        'pinata_api_key': os.getenv('PINATA_API_KEY'),
        'pinata_secret_api_key': os.getenv('PINATA_API_SECRET'),
    }

    with open(filepath, 'rb') as fp:
        image_binary = fp.read()
        response = requests.post(
            pinata_url + endpoint,
            files={'file': (filename, image_binary)},
            headers=headers,
        )
    print(response.json())