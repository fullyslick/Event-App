import configData from './config.json';
import { transformApiEvent } from './transform-event-data';

async function transformData(data) {
  const { events } = data;
  let eventsData = [];

  try {
    if (events?.length) {
      eventsData = events.map((event) => {
        return transformApiEvent(event);
      });
    }
    return Promise.resolve(eventsData);
  } catch (error) {
    return Promise.reject(
      new Error('Something went wrong while preparing your data!')
    );
  }
}

export async function getEvents() {
  try {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/organizations/${configData.ORGANIZATION_ID}/events/?expand=ticket_availability,venue,category`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${configData.API_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Unable to fetch data!');
    }

    const eventsData = await transformData(data);

    return Promise.resolve(eventsData);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getEventDetails(eventId) {
  try {
    const response = await fetch(
      `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_availability,venue,category`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${configData.API_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Unable to fetch data!');
    }

    const eventData = await transformApiEvent(data);

    return Promise.resolve(eventData);
  } catch (error) {
    return Promise.reject(error);
  }
}
