import 'should';
import { describe, it } from 'mocha';

import Scene from './';

describe('Scene', () => {
  it('has no properties defined by default', () => {
    const scene = new Scene();

    scene.build().should.deepEqual({});
  });

  it('can have a name', () => {
    const scene = new Scene();
    scene.name('scene name');

    scene.build().should.have.property('name', 'scene name');
  });

  it('can have its setters chained', () => {
    const scene = new Scene();

    scene.name().should.equal(scene);
  });
});
