const transformAllEvents = (data) => {
  const { events } = data;
  let eventsData = [];

  try {
    if (events?.length) {
      eventsData = events.map((event) => {
        return transformEvent(event);
      });
    }
    return Promise.resolve(eventsData);
  } catch (error) {
    return Promise.reject(new Error('Unable to transform data!'));
  }
};

const transformEvent = (event) => {
  const eventObj = {
    id: event.id,
    title: event.name.text,
    description: event.description.text,
    date: event.start.local,
    location: event.venue?.name ? event.venue.name : 'Online',
    address: event.venue?.address?.localized_address_display
      ? event.venue.address.localized_address_display
      : '',
    imageOriginal: event.logo.original.url,
    image: event.logo.url,
    category: event.category.name,
    availableTickets: event.capacity,
    capacity: event.capacity,
    price: event.ticket_availability.maximum_ticket_price.value,
    displayPrice: event.ticket_availability.maximum_ticket_price.major_value,
    currency: event.ticket_availability.maximum_ticket_price.currency,
    ticketsWishList: 0,
  };

  return eventObj;
};

module.exports = {
  transformAllEvents,
  transformEvent,
};
