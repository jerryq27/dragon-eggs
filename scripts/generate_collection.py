import os
import random
import logging
from PIL import Image

# 5 layers x 5 options (color, pattern, background, gloss position, (rare) has crack)
# Use 5 (0-4) digits to determine which option to use
# Make sure they are unique by adding them to a dictionary

logging.basicConfig(
    filename=os.path.join(os.getcwd(), 'dragoneggs.log'),
    filemode='w',
    level=logging.DEBUG,
    format='%(name)s:%(levelname)s - %(message)s'
)

COLLECTION_SIZE = 10
dragon_eggs = {}
egg_metadata = {
    '': '',
    '': '',
}
name_background = ['shadowy', 'mountainous', 'volcanic', 'sea', 'forest']
name_color = ['orange', 'red', 'green', 'blue', 'purple']
name_pattern = ['spiral', 'wave', 'swirl', 'stripe', 'diamond']
name_rare_trait = ['common', 'uncommon', 'rare', 'super-rare', 'ultra-rare']


def generate_collection():
    # [0-4][0-4][0-4][0-4?]
    logging.info('Generating collection..\n')
    for i in range(COLLECTION_SIZE):
        logging.info('Calculating unique sequence..')
        sequence = calculate_sequence()
        logging.info('Getting image layers..')
        images = get_images(sequence)
        logging.info(f'Creating collectible #{i + 1} [{sequence}]..')
        create_collectible(sequence, images)
        logging.info('Done!\n')


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
        logging.info('No rare trait!')
        return 0

    # It does get a rare trait, determine which pattern.
    pattern_num = random.randint(1, 101)
    logging.info(f'Rare trait! Determinator: {pattern_num}')
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


def create_file_name(sequence):

    background = name_background[int(sequence[0])-1]
    color = name_color[int(sequence[1])-1]
    pattern = name_pattern[int(sequence[2])-1]
    rare_trait = name_rare_trait[int(sequence[3])-1]

    file_name = '-'.join(
        [background, color, pattern, 'egg', rare_trait]
    ) + '.png'

    collection_name = f'{background.title()} {color.title()} {pattern.title()} Egg ({rare_trait.title()})'

    return (collection_name, file_name)


def create_collectible(sequence, images):
    # collectibles_path = os.path.join(
    #     os.getcwd(), 'metadata', 'img', 'collectibles'
    # )
    # if not os.path.exists(collectibles_path):
    #     os.mkdir(collectibles_path)

    # layers = [Image.open(x) for x in images]

    # collectible = layers[0]
    # for layer in layers[1:]:
    #     collectible.paste(layer, (0, 0), layer)

    collection_name, file_name = create_file_name(sequence)
    logging.info(f"{collection_name} '{file_name}'")
    # if not os.path.exists(os.path.join(collectibles_path, file_name)):
    #     collectible.save(os.path.join(collectibles_path, file_name), 'PNG')
    # else:
    #     logging.warning(f'Duplicate: {sequence}: {file_name}')


generate_collection()
