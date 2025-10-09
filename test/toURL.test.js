const { expect } = require('chai');
const nock = require('nock');
const toURL = require('../lib/api/toURL');

describe('toURL', () => {
  it('uploads buffer and returns response', async () => {
    const scope = nock('http://upload.xiex.my.id').post('/').reply(200, { url: 'http://cdn/file.jpg' });
    const buf = Buffer.from('data');
    const res = await toURL(buf, 'jpg');
    expect(res).to.have.property('url');
    scope.done();
  });

  it('downloads remote file and uploads it', async () => {
    const fileScope = nock('https://example.com').get('/img').reply(200, 'IMG');
    const uploadScope = nock('http://upload.xiex.my.id').post('/').reply(200, { url: 'http://cdn/img.jpg' });
    const res = await toURL('https://example.com/img');
    expect(res).to.have.property('url');
    fileScope.done();
    uploadScope.done();
  });

  it('throws when buffer without extension', async () => {
    try {
      await toURL(Buffer.from('a'));
      throw new Error('should have thrown');
    } catch (e) {
      expect(e.message).to.match(/extension not found/);
    }
  });
});
