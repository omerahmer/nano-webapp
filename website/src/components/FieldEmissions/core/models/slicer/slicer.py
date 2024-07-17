# ToDo: Add docs comments

from core.models.layout.chip import Chip
from core.models.slicer.f_code import FCode, DeviceDriver


class Slicer:
    def __init__(self, chip: Chip):
        self._chip = chip
        self._head_x_size = 5
        self._head_y_size = 5

    def to_fcode(self) -> FCode:
        f_code = FCode()
        pixel_size = self._chip.get_physical_width() \
                     / self._chip.get_pixels_width()

        f_code.add_command(DeviceDriver.GEN_G_CONTROLLER, 'START')
        f_code.add_command(DeviceDriver.STAGE_CONTROLLER, 'Move to position 0')
        for pixels_y in range(0, self._chip.get_pixels_height(),
                              self._head_y_size):
            for pixels_x in range(0, self._chip.get_pixels_width(),
                                  self._head_x_size):
                channels_lit = ''
                for pixel_x in range(pixels_x, pixels_x + self._head_x_size):
                    if self._chip.get_pixel(pixel_x, pixels_y).on:
                        channels_lit += '1'
                    else:
                        channels_lit += '0'
                f_code.add_command(DeviceDriver.VOLTAGE_CONTROLLER,
                                   channels_lit)
                f_code.add_command(DeviceDriver.GEN_G_CONTROLLER,
                                   'Wait 0 seconds')
                f_code.add_command(DeviceDriver.VOLTAGE_CONTROLLER,
                                   '0' * self._head_x_size)
                if pixels_x + self._head_x_size < self._chip.get_pixels_width():
                    f_code.add_command(DeviceDriver.STAGE_CONTROLLER,
                                       f'Move x-axis +{pixel_size * self._head_x_size} nm')
            if pixels_y + self._head_y_size < self._chip.get_pixels_height():
                f_code.add_command(DeviceDriver.STAGE_CONTROLLER,
                                   f'Move y-axis +{self._head_y_size * pixel_size} nm and x-axis '
                                   f'-{(self._chip.get_pixels_width() - self._head_x_size) * pixel_size} nm')
        f_code.add_command(DeviceDriver.STAGE_CONTROLLER, 'Move to position 0')
        f_code.add_command(DeviceDriver.GEN_G_CONTROLLER, 'END')
        return f_code