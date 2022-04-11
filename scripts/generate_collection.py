from operator import contains
import os
import random
from turtle import back
from PIL import Image

# 5 layers x 5 options (color, pattern, background, gloss position, (rare) has crack)
# Use 5 (0-4) digits to determine which option to use
# Make sure they are unique by adding them to a dictionary

COLLECTION_SIZE = 100
dragon_eggs = {}
egg_metadata = {
    "": "",
    "": "",
}


def generate_collection():
    # [0-4][0-4][0-4][0-4?]
    print('Generating collection..')
    for i in range(10):
        print('Calculating unique sequence..')
        sequence = calculate_sequence()
        print('Getting collection layers..')
        images = get_images(sequence)
        print('Creating collectible..')
        create_collectible(sequence, images)
        print()


def calculate_sequence():
    unique = False

    while not unique:
        # #,###
        background = random.randrange(1, 6) * 10 ** 3
        color = random.randrange(1, 6) * 10 ** 2
        pattern = random.randrange(1, 6) * 10
        # 25% chance of getting an egg with a crack.
        crack = determine_trait_pattern() if random.randrange(1, 101) >= 75 else 0

        sequence = background + color + pattern + crack

        if sequence in dragon_eggs:
            continue
        else:
            unique = True

            dragon_eggs[sequence] = str(sequence)
            return dragon_eggs[sequence]


# If this rare trait is going to be generated, determine which pattern.


def determine_trait_pattern():
    pattern_num = random.randint(1, 101)

    # More common pattern 25% chance.
    if pattern_num >= 25:
        return 1
    elif pattern_num > 25 and pattern_num <= 50:
        return 2
    # Less common pattern 20% chance.
    elif pattern_num > 50 and pattern_num <= 70:
        return 3
    elif pattern_num > 70 and pattern_num <= 90:
        return 4
    # Rarest pattern 10% chance.
    else:
        return 5


def get_images(sequence):
    img_path = os.path.join(os.getcwd(), 'metadata', 'img')

    background = os.path.join(img_path, f'background-{sequence[0]}.png')
    color = os.path.join(img_path, f'color-{sequence[1]}.png')
    pattern = os.path.join(img_path, f'pattern-{sequence[2]}.png')
    crack = None if sequence[3] == '0' else os.path.join(
        img_path, f'crack-{sequence[3]}.png')

    images = [background, color, pattern, crack]
    return images if crack else images[:-1]


def create_collectible(sequence, images):
    collectibles_path = os.path.join(
        os.getcwd(), 'metadata', 'img', 'collectibles')
    if not os.path.exists(collectibles_path):
        os.mkdir(collectibles_path)

    layers = [Image.open(x) for x in images]

    print('Generating NFT...')
    collectible = layers[0]
    for layer in layers[1:]:
        collectible.paste(layer, (0, 0), layer)

    collectible.save(os.path.join(collectibles_path, f'{sequence}.png'), 'PNG')
    print('Done!')


generate_collection()
