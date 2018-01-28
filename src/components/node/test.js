import 'should';
import { describe, it } from 'mocha';

import Node from './';

describe('Node', () => {
  it('has no properties defined by default', () => {
    const node = new Node();

    node.build().should.deepEqual({});
  });

  it('can have a name', () => {
    const node = new Node();
    node.name('node name');

    node.build().should.have.property('name', 'node name');
  });

  it('can have its setters chained', () => {
    const node = new Node();

    node.name().should.equal(node);
  });
});
