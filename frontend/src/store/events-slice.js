import { createSlice } from "@reduxjs/toolkit"; // Uses Immer behind the scenes so it is safe to mutate state directly
import localStorageHelper from "../utils/local-storage";

const initialEventState = {
    events: [],
    totalWishList: 0,
    totalPrice: 0,
    areEventsReplaced: false
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventState,
    reducers: {
        addToWishLst(state, action) {
            const updatedEventId = action.payload;
            const events = state.events;

            const updatedEventIndex = events.findIndex(event => event.id === updatedEventId);

            // No such event found in state
            if (updatedEventId < 0) {
                return;
            }

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

            // If localStorage data was deleted by user just re-build it
            if (!localStorageHelper.hasLocalStorageData()) {
                localStorageHelper.rebuiltStorage(events);
                return;
            }

            // localStorage data exist so update it   
            const localWishlist = localStorageHelper.getLocalStorageData();

            if (localWishlist.hasOwnProperty(updatedEventId)) {
                localWishlist[updatedEventId] += 1;
            } else {
                localWishlist[updatedEventId] = 1;
            }

            localStorageHelper.updateStorage(localWishlist);
        },
        removeFromWishList(state, action) {
            const updatedEventId = action.payload;
            const events = state.events;

            const updatedEventIndex = events.findIndex(event => event.id === updatedEventId);

            // No such event found in state
            if (updatedEventId < 0) {
                return;
            }

            // If the event's wishlist is 0 return early
            if (!events[updatedEventIndex].ticketsWishList) {
                return;
            }

            // Update Redux state (ok with Immer)
            events[updatedEventIndex].availableTickets += 1;

            events[updatedEventIndex].ticketsWishList -= 1;

            state.totalWishList -= 1;

            state.totalPrice -= events[updatedEventIndex].price;

            // Update local storage

            // If localStorage data was deleted by user just re-build it
            if (!localStorageHelper.hasLocalStorageData()) {
                localStorageHelper.rebuiltStorage(events);
                return;
            }

            // localStorage data exist so update it   
            const localWishlist = localStorageHelper.getLocalStorageData();

            if (localWishlist.hasOwnProperty(updatedEventId)) {
                localWishlist[updatedEventId] -= 1;
            }

            localStorageHelper.updateStorage(localWishlist);
        },
        replaceEvents(state, action) {
            let onLoadTotalWishList = 0;
            let onLoadTotalPrice = 0;
            const eventsData = action.payload;

            if (localStorage.getItem('eventsWishlist')) {
                // Get data from localStorage wishlist
                // Loop over all API data and replace ticketsWishList of event with data from localStorage
                const localWishlist = localStorageHelper.getLocalStorageData();


                eventsData.forEach(event => {
                    if (localWishlist.hasOwnProperty(event.id)) {

                        // If there are no available tickets, reset local Storage wish list for this item
                        if (!event.availableTickets || localWishlist[event.id] < 0) {
                            localWishlist[event.id] = 0;
                            localStorageHelper.updateStorage(localWishlist);
                        }

                        // If the localWishlist has more items, then available,
                        // that means the Event has been updated on the Eventbrite site,
                        // So reset this wish list item in local storage
                        if (localWishlist[event.id] > event.availableTickets) {
                            localStorageHelper.resetWishListItem(event.id);
                        }

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
            // Flag used by pages to detect if events should be fetched.
            // Previously "events" existence was used as signal to load all API data
            // However single event API call, populates events, so this "existence event" will not work properly
            // Instead this flag is used
            state.areEventsReplaced = true;
        }

    }
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;