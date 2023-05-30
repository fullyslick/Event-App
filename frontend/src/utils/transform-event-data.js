export const transformNewEventData = (inputValues) => {
  const {
    title,
    summary,
    date,
    location,
    address,
    image,
    category,
    capacity,
    price,
  } = inputValues;

  const event = {
    id: new Date().getTime().toString(),
    title: title,
    description: summary,
    date: date.toISOString(),
    location: location,
    address: address,
    imageOriginal: image,
    image: image,
    category: category,
    availableTickets: capacity,
    price: Math.floor(price * 100),
    displayPrice: `${Math.floor(price * 100) / 100}`,
    currency: 'USD',
    ticketsWishList: 0,
  };

  return event;
};

export const transformApiEvent = (event) => {
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
    price: event.ticket_availability.maximum_ticket_price.value,
    displayPrice: event.ticket_availability.maximum_ticket_price.major_value,
    currency: event.ticket_availability.maximum_ticket_price.currency,
    ticketsWishList: 0,
  };

  return eventObj;
};
