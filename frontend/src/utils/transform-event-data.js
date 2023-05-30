const transformEventData = (inputValues) => {
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

export default transformEventData;
