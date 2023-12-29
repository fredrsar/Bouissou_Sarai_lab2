var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
})

// Log when the Redis client connects
db.on('connect', () => {
  console.log('Connected to Redis');
});

// Log when an error occurs
db.on('error', (err) => {
  console.error('Redis error:', err);
});

process.on('SIGINT', function() {
  // Log before quitting
  console.log('Closing Redis connection due to SIGINT');
  db.quit();
});

module.exports = db;
