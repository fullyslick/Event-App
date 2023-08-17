import { EventListing, NewEvent } from '../types';

export const transformNewEventData = (inputValues: NewEvent) => {
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

  // Fixes redux non-serializable value issue - convert class instance to object literal
  return JSON.parse(JSON.stringify(eventListing));
};
