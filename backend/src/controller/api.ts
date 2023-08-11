import { RequestHandler } from 'express';
import { transformAllEvents, transformEvent } from '../utils/transform-data';
import request from 'request';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../env-data/.env') });

const organizationId = process.env.ORGANIZATION_ID!;

const getEventsUrl = process.env.API_ALL_EVENTS_URL!.replace(
  '[organizationId]',
  organizationId
);

const headers = {
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

const getEvents: RequestHandler = (req, res) => {
  const url = `${process.env.API_BASE_URL}${getEventsUrl}`;

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

const getEventDetail: RequestHandler = (req, res) => {
  const eventId = req.query.eventId;

  const url = `${
    process.env.API_BASE_URL
  }${process.env.API_SINGLE_EVENT_URL.replace('[eventId]', eventId as string)}`;

  request({ url, headers }, async (error, response, body) => {
    try {
      if (response.statusCode !== 200) {
        throw new Error('Unable to fetch data from Eventbrite!');
      } else {
        // Transform the data received from the API
        const transformedData = await transformEvent(JSON.parse(body));

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

export { getEvents, getEventDetail };
