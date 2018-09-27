import ComponentBase from '../component-base/';

export const modes = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};

export default class Primitive extends ComponentBase {
  mode(mode) {
    this.properties.mode = mode;
    return this;
  }
}
