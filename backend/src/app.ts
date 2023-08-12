import express from 'express';
import apiRoutes from './routes/api';

const app = express();
const port = 8080;

// Allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.use('/api', apiRoutes);

// Todo add error handling middleware

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
