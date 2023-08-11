import { RequestHandler } from 'express';
import { transformAllEvents } from '../utils/transform-data';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config({ path: '../env-data/.env' });

const organizationId = process.env.ORGANIZATION_ID!;

const getEventsUrl = process.env.API_ALL_EVENTS_URL!.replace(
  '[organizationId]',
  organizationId
);

const getTodos: RequestHandler = (req, res) => {
  const url = `${process.env.API_BASE_URL}${getEventsUrl}`;

  // Set the Authorization header with the Bearer token
  const headers = {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  };

  // Make a request to the Eventbrite API
  request({ url, headers }, async (error, response, body) => {
    try {
      if (response.statusCode !== 200) {
        throw new Error('Unable to fetch data from Eventbrite!');
      } else {
        // Transform the data received from the API
        const transformedData = await transformAllEvents(JSON.parse(body));

        // Send the transformed data back to the client
        res.json(transformedData);
      }
    } catch (error) {
      res.status(500);
      res.json({
        error: error.message,
      });
    }
  });
};
