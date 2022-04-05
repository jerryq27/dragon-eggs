import os
from PIL import Image

# 5 layers x 5 options
# Use 5 (0-4) digits to determine which option to use
# Make sure they are unique by adding them to a dictionary

dragon_eggs = {}
egg_metadata = {
    "": "",
    "": "",
}


def create_collectable():
    img_path = os.path.join(os.getcwd(), 'metadata', 'img')
    layers = [Image.open(x) for x in [
        os.path.join(img_path, 'base.png'),
        os.path.join(img_path, 'pattern.png')
    ]]

    print('Generating NFT...')
    collectible = layers[0]
    for layer in layers[1:]:
        collectible.paste(layer, (0, 0), layer)

    collectible.save(os.path.join(img_path, 'collectible.png'), 'PNG')
    print('Done!')


create_collectable()
