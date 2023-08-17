import { EventListing } from '../types';

export const transformNewEventData = (inputValues: any) => {
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

  const eventListing = new EventListing(
    new Date().getTime().toString(),
    title,
    summary,
    date.toISOString(),
    location,
    address,
    image,
    image,
    category,
    capacity,
    capacity,
    Math.floor(price * 100),
    Math.round(price * 100) / 100,
    'USD',
    0
  );

  return eventListing;
};
