import os
import random
from PIL import Image

# 5 layers x 5 options (color, pattern, background, gloss position, (rare) has crack)
# Use 5 (0-4) digits to determine which option to use
# Make sure they are unique by adding them to a dictionary

COLLECTION_SIZE = 10
dragon_eggs = {}
egg_metadata = {
    '': '',
    '': '',
}
name_background = ['shadowy', 'mountainous', 'volcanic', 'sea', 'forest']
name_color = ['light', 'fire', 'wind', 'water', 'dark']
name_pattern = ['spiraly', 'wavy', 'swirled', 'striped', 'diamond']


def generate_collection():
    # [0-4][0-4][0-4][0-4?]
    print('Generating collection..')
    for i in range(COLLECTION_SIZE):
        print('Calculating unique sequence..')
        sequence = calculate_sequence()
        print('Getting image layers..')
        images = get_images(sequence)
        print(f'Creating collectible #{i} [{sequence}]..')
        create_collectible(sequence, images)
        print('Done!\n')


def calculate_sequence():
    unique = False

    while not unique:
        # #,###
        background = random.randrange(1, 6) * 10 ** 3
        color = random.randrange(1, 6) * 10 ** 2
        pattern = random.randrange(1, 6) * 10
        crack = determine_rare_trait()

        sequence = background + color + pattern + crack

        if sequence in dragon_eggs:
            continue
        else:
            unique = True
            dragon_eggs[sequence] = str(sequence)
            return dragon_eggs[sequence]


def determine_rare_trait():
    """
    If this rare trait is going to be generated, determine which pattern.
    """

    # 25% chance of getting an egg with the rare trait: a crack.
    has_rare_trait_num = random.randrange(1, 101)
    if has_rare_trait_num <= 75:
        print('No rare trait!')
        return 0

    # It does get a rare trait, determine which pattern.
    pattern_num = random.randint(1, 101)
    print(f'Rare trait determinator: {pattern_num}')
    # More common pattern, bottom crack: 25% chance.
    if pattern_num <= 25:
        return 1
    elif pattern_num > 25 and pattern_num <= 50:
        return 2
    # Less common pattern, top crack: 20% chance.
    elif pattern_num > 50 and pattern_num <= 70:
        return 3
    elif pattern_num > 70 and pattern_num <= 90:
        return 4
    # Rarest pattern, full crack: 10% chance.
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
        os.getcwd(), 'metadata', 'img', 'collectibles'
    )
    if not os.path.exists(collectibles_path):
        os.mkdir(collectibles_path)

    layers = [Image.open(x) for x in images]

    collectible = layers[0]
    for layer in layers[1:]:
        collectible.paste(layer, (0, 0), layer)

    collectible.save(os.path.join(collectibles_path, f'{sequence}.png'), 'PNG')


generate_collection()
