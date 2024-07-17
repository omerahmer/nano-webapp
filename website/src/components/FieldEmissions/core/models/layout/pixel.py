"""
This module holds an implementation of the Pixel class which is a representation
of a single e-beam written spot.
"""


class Pixel:
    """
    The implementation of Pixel related operations and live data updates
    """

    def __init__(self, x, y, on: bool = False):
        """
        Creates a Pixel with X and Y coordinates

        :param x: Becomes the X coordinate of the pixel
        :param y: Becomes the Y coordinate of the pixel
        """
        self.position = (x, y)
        self.id = f'pixel_{x}_{y}'
        self.on = on

    def __dict__(self):
        """
        Enables converting a Pixel to a dictionary representation

        :return: A dictionary representation of the Pixel
        """
        return {'id': self.id}