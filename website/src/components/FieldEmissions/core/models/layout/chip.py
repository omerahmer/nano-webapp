"""
This module holds an implementation of the Chip.
It's responsible for holding data related to creating, managing, and
manufacturing the layout.
"""
from core.models.layout.pixel import Pixel


def _generate_empty_matrix(width_num: int, height_num: int):
    """
    Generates an empty width_num by height_num array of Pixels

    :param width_num: Number of pixels on the X-axis
    :param height_num: Number of pixels on the Y-axis
    :return: A matrix filled with turned on Pixels of the specified size
    """
    matrix = []
    for y in range(height_num):
        row = []
        for x in range(width_num):
            row.append(Pixel(x, y))
        matrix.append(row)
    return matrix


class Chip:
    """
    The implementation of all Chip related methods used for designing and
    manufacturing it
    """

    def __init__(self, width_num: int, height_num: int,
                 physical_width: int = None,
                 physical_height: int = None):
        """
        Creates a Chip of size width_num by height_num filled with turned off
        Pixels. If the physical dimensions are not specified, the physical size
        would be number of pixels on the axis multiplied by 100 nm

        :param width_num: Number of pixels on the X-axis
        :param height_num: Number of pixels on the Y-axis
        :param physical_width Physical width of the layout in nanometers
        :param physical_height Physical height of the layout in nanometers
        """
        if width_num <= 0 or height_num <= 0:
            raise ValueError('Invalid Chip Size')
        self._pixels_width = width_num
        self._pixels_height = height_num
        # ToDo: add checking if chip is possible to manufacture (are pixels
        #  squares)
        if physical_width is None:
            self._physical_width = 100 * self._pixels_width
        else:
            self._physical_width = physical_width
        if physical_height is None:
            self._physical_height = 100 * self._pixels_height
        else:
            self._physical_height = physical_height

        self._chip_matrix = _generate_empty_matrix(self._pixels_width,
                                                   self._pixels_height)

    def get_physical_width(self):
        """
        :return: Physical width of the Chip
        """
        return self._physical_width

    def set_physical_width(self, physical_width):
        """
        Updates the physical size of the Chip

        :param physical_width: Becomes the new physical width
        :return: None
        """
        self._physical_width = physical_width

    def get_physical_height(self):
        """
        :return: Physical height of the Chip
        """
        return self._physical_height

    def set_physical_height(self, physical_height):
        """
        Updates the physical size of the Chip

        :param physical_height: Becomes the new physical height
        :return: None
        """
        self._physical_height = physical_height

    def get_pixels_width(self):
        return self._pixels_width

    def get_pixels_height(self):
        return self._pixels_height

    def get_pixel(self, x, y) -> Pixel:
        """
        Returns the pixel on (x, y) position

        :param x: X coordinate of the pixel
        :param y: Y coordinate of the pixel
        :return:
        """
        if (x < 0) or (y < 0) or (x >= self._pixels_width) or (
                y >= self._pixels_height):
            raise IndexError('Index out of range on the Chip')
        return self._chip_matrix[y][x]

    def __dict__(self):
        """
        Enables converting a Chip to a dictionary representation

        :return: A dictionary representation of the Chip
        """
        return {
            'width': self._pixels_width,
            'height': self._pixels_height,
            'grid': [
                [self.get_pixel(x, y).__dict__() for x in
                 range(self._pixels_width)]
                for y in range(self._pixels_height)]
        }