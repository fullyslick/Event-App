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

// Get single event details
// app.get('/api/get-event-details', (req, res, next) => {
//   const eventId = req.query.eventId;

//   const url = `${
//     process.env.API_BASE_URL
//   }${process.env.API_SINGLE_EVENT_URL.replace('[eventId]', eventId as any)}`;

//   // Set the Authorization header with the Bearer token
//   const headers = {
//     Authorization: `Bearer ${process.env.API_TOKEN}`,
//   };

//   // Make a request to the Eventbrite API
//   request({ url, headers }, async (error, response, body) => {
//     try {
//       if (response.statusCode !== 200) {
//         throw new Error('Unable to fetch data from Eventbrite!');
//       } else {
//         // Transform the data received from the API
//         const transformedData = await transformData.transformEvent(
//           JSON.parse(body)
//         );

//         // Send the transformed data back to the client
//         res.json(transformedData);
//       }
//     } catch (error) {
//       res.status(500);
//       res.json({
//         error: error.message,
//       });
//     }
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
