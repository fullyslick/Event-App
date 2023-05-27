const organizationId = '1574685524443'
const token = 'D27USCKRO7EGLYO5DPKO';
const eventId = '643618649707'; // dynamic value
const account = `https://www.eventbriteapi.com/v3/users/me/?token=${token}`;
const getAllEvents = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`;
const getOrganizationId = `https://www.eventbriteapi.com/v3/users/me/organizations/`;
const getCategoryMappings = `https://www.eventbriteapi.com/v3/categories/`;
const getEventDetails = `https://www.eventbriteapi.com/v3/events/${eventId}/`;


async  function transformData(data){
    const { events } = data;
    let eventsData = [];

    try {
        if (events?.length) {
            eventsData = events.map((event) => {
                const eventObj = {
                    id: event.id,
                    title: event.name.text,
                    description: event.summary,
                    date: event.start.local,
                    location: '', // TODO remove 
                    imageOriginal: event.logo.original.url,
                    image: event.logo.url,
                    categoryId: event['category_id'],
                    availableTickets: event.capacity,
                    price: 0, // TODO find how to add,
                    ticketsWishList: 0
                }
    
                return eventObj;
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
                Authorization: `Bearer ${token}`
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