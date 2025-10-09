const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const nock = require('nock');
const mediaToBuffer = require('../lib/api/media2buffer');

describe('media2buffer', () => {
  it('should return buffer for local file path', async () => {
    const sample = path.join(__dirname, 'sample.txt');
    fs.writeFileSync(sample, 'hello');
    const buf = await mediaToBuffer(sample);
    expect(Buffer.isBuffer(buf)).to.be.true;
    expect(buf.toString()).to.equal('hello');
    fs.unlinkSync(sample);
  });

  it('should fetch remote URL and return buffer', async () => {
    const scope = nock('https://example.com').get('/file').reply(200, 'world');
    const buf = await mediaToBuffer('https://example.com/file');
    expect(Buffer.isBuffer(buf)).to.be.true;
    expect(buf.toString()).to.equal('world');
    scope.done();
  });

  it('should return the same buffer if input is buffer', async () => {
    const b = Buffer.from('abc');
    const out = await mediaToBuffer(b);
    expect(out).to.equal(b);
  });

  it('should throw for missing input', async () => {
    try {
      await mediaToBuffer(undefined);
      throw new Error('should have thrown');
    } catch (e) {
      expect(e.message).to.match(/input not found/);
    }
  });
});
