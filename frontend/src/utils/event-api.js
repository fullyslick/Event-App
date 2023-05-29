import configData from './config.json';

const getAllEvents = `https://www.eventbriteapi.com/v3/organizations/${configData.ORGANIZATION_ID}/events/?expand=ticket_availability,venue,category`;

function transformEvent(event) {    
    const eventObj = {
        id: event.id,
        title: event.name.text,
        description: event.description.text,
        date: event.start.local,
        location: event.venue?.name ? event.venue.name : 'Online',
        address: event.venue?.address?.localized_address_display ? event.venue.address.localized_address_display : '',
        imageOriginal: event.logo.original.url,
        image: event.logo.url,
        category: event.category.name,
        availableTickets: event.capacity,
        price: event.ticket_availability.maximum_ticket_price.value,
        displayPrice: event.ticket_availability.maximum_ticket_price.major_value,
        currency: event.ticket_availability.maximum_ticket_price.currency,
        ticketsWishList: 0
    }

    return eventObj;
};

async function transformData(data) {
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
        return Promise.reject(new Error('Something went wrong while preparing your data!'));
    }
}

export async function getEvents() {

    try {
        const response = await fetch(getAllEvents, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${configData.API_TOKEN}`
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Unable to fetch data!');
        }

        const eventsData = await transformData(data);

        return Promise.resolve(eventsData);
    } catch (error) {
        return Promise.reject(error);
    }
};

export async function getEventDetails(eventId) {

    try {
        const response = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_availability,venue,category`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${configData.API_TOKEN}`
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Unable to fetch data!');
        }

        const eventData = await transformEvent(data);

        return Promise.resolve(eventData);
    } catch (error) {
        return Promise.reject(error);
    }
};