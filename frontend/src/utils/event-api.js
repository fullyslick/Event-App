export async function getEvents() {
  try {
    const response = await fetch('http://localhost:8080/api/get-events');
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Unable to fetch data!');
    }

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getEventDetails(eventId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/get-event-details/?eventId=${eventId}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Unable to fetch data!');
    }

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
