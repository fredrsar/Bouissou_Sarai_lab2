const { expect } = require('chai');

let db;

describe('Redis', () => {
  before(() => {
    db = require('../src/dbClient');
  });

  it('should connect to Redis', (done) => {
    
    db.on('ready', () => {
      
      expect(db.connected).to.eql(true);
      done(); 
    });
  });
});