const http = require('http');
const app = require('./server');

const PORT = process.env.PORT || 3001;

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  const server = app.listen(PORT, async () => {
    try {
      const root = await get('/');
      if (root.status !== 200) throw new Error(`GET / failed with status ${root.status}`);

      const health = await get('/health');
      if (health.status !== 200) throw new Error(`GET /health failed with status ${health.status}`);
      const healthBody = JSON.parse(health.body);
      if (healthBody.status !== 'ok') throw new Error('Health check body did not report ok');

      console.log('All tests passed!');
      server.close(() => process.exit(0));
    } catch (err) {
      console.error('Test failed:', err.message);
      server.close(() => process.exit(1));
    }
  });
}

runTests();
