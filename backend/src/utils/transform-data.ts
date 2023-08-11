import { EventbriteEvent, EventbriteResponseEvent } from '../types/events';

const transformAllEvents = (data: { events: EventbriteResponseEvent[] }) => {
  const { events } = data;
  let eventsData: EventbriteEvent[] = [];

  try {
    if (events?.length) {
      eventsData = events.map((event) => {
        return transformEvent(event);
      });
    }
    return eventsData;
  } catch (error) {
    return new Error('Unable to transform data!');
  }
};

const transformEvent = (event: EventbriteResponseEvent) => {
  const eventObj = new EventbriteEvent(
    event.id,
    event.name.text,
    event.description.text,
    event.start.local,
    event.venue?.name ? event.venue.name : 'Online',
    event.venue?.address?.localized_address_display
      ? event.venue.address.localized_address_display
      : '',
    event.logo.original.url,
    event.logo.url,
    event.category.name,
    event.capacity,
    event.capacity,
    event.ticket_availability.maximum_ticket_price.value,
    event.ticket_availability.maximum_ticket_price.major_value,
    event.ticket_availability.maximum_ticket_price.currency,
    0
  );

  return eventObj;
};

export { transformAllEvents, transformEvent };
