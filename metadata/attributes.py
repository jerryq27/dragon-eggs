from enum import Enum


class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3
    PURPLE = 4


class Pattern(Enum):
    BLANK = 1
    DOTS = 2
    STRIPES = 3
    SWIRLS = 4


class Base(Enum):
    UNCRACKED = (1,)
    TOP_CRACK = (2,)
    BASE_CRACK = (3,)
    Y_CRACK = 4
