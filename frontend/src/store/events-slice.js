import { createSlice } from "@reduxjs/toolkit"; // Uses Immer behind the scenes so it is safe to mutate state directly

const initialEventState = {
    events: [],
    totalWishList: 0,
    totalPrice: 0
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventState,
    reducers: {
        addToWishLst(state, action) {
            const updatedEventId = action.payload;
            const events = state.events;

            const updatedEventIndex = events.findIndex(event => event.id === updatedEventId);

            if (updatedEventId >= 0) {
                // If availableTickets for this event are 0 return early
                if (!events[updatedEventIndex].availableTickets) {
                    return;
                }

                // Update Redux state (ok with Immer)
                events[updatedEventIndex].availableTickets -= 1;

                events[updatedEventIndex].ticketsWishList += 1;

                state.totalWishList += 1;

                state.totalPrice += events[updatedEventIndex].price;

                // Update local storage
                const localWishlist = JSON.parse(localStorage.getItem('eventsWishlist'));

                if (localWishlist.hasOwnProperty(updatedEventId)) {
                    localWishlist[updatedEventId] += 1;
                } else {
                    localWishlist[updatedEventId] = 1;
                }            

                console.log(localWishlist)

                localStorage.setItem('eventsWishlist', JSON.stringify(localWishlist));
            }
        },
        removeFromWishList(state, action) {
            const id = action.payload;
            // TODO:'
            // If the event's wishlist is 0 return early
            // Should find event by id
            // Increment its wishlist -
            // Update available tickets for this event
            // Update totalWishList 1
            // Update Total Price
            // Increment total price with the price of event ticket
        },
        replaceEvents(state, action) {
            let onLoadTotalWishList = 0;
            let onLoadTotalPrice = 0;
            const eventsData = action.payload;

            if (localStorage.getItem('eventsWishlist')) {
                // Get data from localStorage wishlist
                // Loop over all API data and replace ticketsWishList of event with data from localStorage
                const localWishlist = JSON.parse(localStorage.getItem('eventsWishlist'));


                eventsData.forEach(event => {                  
                    if (localWishlist.hasOwnProperty(event.id) && event.availableTickets > 0) {
                        if (localWishlist[event.id] <= event.availableTickets) {
                            event.ticketsWishList = localWishlist[event.id];
                            onLoadTotalWishList += localWishlist[event.id];

                            event.availableTickets -= localWishlist[event.id];

                            onLoadTotalPrice += event.price * localWishlist[event.id];
                        }
                    }
                });
            }

            // Uses Immer behind the scenes so it is safe to mutate state directly
            state.events = action.payload;
            state.totalWishList = onLoadTotalWishList;
            state.totalPrice = onLoadTotalPrice;
        }

    }
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;