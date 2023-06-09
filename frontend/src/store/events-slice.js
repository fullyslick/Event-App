import { createSlice } from '@reduxjs/toolkit'; // Uses Immer behind the scenes so it is safe to mutate state directly
import localStorageHelper from '../utils/local-storage';

const initialEventState = {
  events: [],
  totalWishList: 0,
  totalPrice: 0,
  areEventsReplaced: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: initialEventState,
  reducers: {
    addToWishLst(state, action) {
      const { id: updatedEventId, qty } = action.payload;
      const stateEvents = state.events;

      const updatedEventIndex = stateEvents.findIndex(
        (event) => event.id === updatedEventId
      );

      // No such event found in state
      if (updatedEventId < 0) {
        return;
      }

      // Update Totals
      state.totalPrice += qty * stateEvents[updatedEventIndex].price;

      state.totalWishList += qty;

      // Update Redux state (ok with Immer)
      stateEvents[updatedEventIndex].availableTickets -= qty;

      stateEvents[updatedEventIndex].ticketsWishList += qty;

      // Update local storage
      // If localStorage data was deleted by user just re-build it
      if (!localStorageHelper.hasLocalStorageData()) {
        localStorageHelper.rebuiltStorage(stateEvents);
        return;
      }

      // localStorage data exist so update it
      const localWishlist = localStorageHelper.getLocalWishlist();

      if (localWishlist.hasOwnProperty(updatedEventId)) {
        localWishlist[updatedEventId] +=
          stateEvents[updatedEventIndex].ticketsWishList;
      } else {
        // New entry added to localStorage
        localWishlist[updatedEventId] = qty;
      }

      localStorageHelper.updateLocalWishlist(localWishlist);
    },
    removeFromWishList(state, action) {
      const updatedEventId = action.payload;
      const stateEvents = state.events;

      const updatedEventIndex = stateEvents.findIndex(
        (event) => event.id === updatedEventId
      );

      // No such event found in state
      if (updatedEventId < 0) {
        return;
      }

      state.totalWishList -= stateEvents[updatedEventIndex].ticketsWishList;

      state.totalPrice -=
        stateEvents[updatedEventIndex].ticketsWishList *
        stateEvents[updatedEventIndex].price;

      // Update Redux state (ok with Immer)
      // Reset available tickets = capacity
      stateEvents[updatedEventIndex].availableTickets =
        stateEvents[updatedEventIndex].capacity;

      stateEvents[updatedEventIndex].ticketsWishList = 0;

      // Update local storage

      // If localStorage data was deleted by user just re-build it
      if (!localStorageHelper.hasLocalStorageData()) {
        localStorageHelper.rebuiltStorage(stateEvents);
        return;
      }

      // localStorage data exist so update it
      const localWishlist = localStorageHelper.getLocalWishlist();

      if (localWishlist.hasOwnProperty(updatedEventId)) {
        localWishlist[updatedEventId] = 0;
      }

      localStorageHelper.updateLocalWishlist(localWishlist);
    },
    replaceEvents(state, action) {
      let onLoadTotalWishList = 0;
      let onLoadTotalPrice = 0;
      const eventsData = [...action.payload];

      // Get data from localStorage wishlist
      const localWishlist = localStorageHelper.getLocalWishlist();

      if (localWishlist) {
        // Loop over all API data and replace ticketsWishList of event with data from localStorage
        // Mutating eventsData
        eventsData.forEach((event) => {
          if (localWishlist.hasOwnProperty(event.id)) {
            // If there are no available tickets, reset local Storage wish list for this item
            if (!event.availableTickets || localWishlist[event.id] < 0) {
              localWishlist[event.id] = 0;
              localStorageHelper.updateLocalWishlist(localWishlist);
            }

            // If the localWishlist has more items, then available,
            // that means the Event has been updated on the Eventbrite site,
            // So reset this wish list item in local storage
            if (localWishlist[event.id] > event.availableTickets) {
              localStorageHelper.resetWishListItem(event.id);
            }

            // If there is enough available tickets, get the data from local cache and update the event data
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
      state.events = eventsData;
      state.totalWishList = onLoadTotalWishList;
      state.totalPrice = onLoadTotalPrice;
      // Flag used by pages to detect if events should be fetched.
      // Previously "events" existence was used as signal to load all API data
      // However single event API call, populates events, so this "existence event" will not work properly
      // Instead this flag is used
      state.areEventsReplaced = true;
    },
    appendEvent(state, action) {
      const event = action.payload;
      // Get data from localStorage wishlist
      const localWishlist = localStorageHelper.getLocalWishlist();
      let totalWishlistEvents = 0;

      for (const key in localWishlist) {
        totalWishlistEvents += localWishlist[key];
      }

      if (localWishlist.hasOwnProperty(event.id)) {
        // If there are no available tickets, reset local Storage wish list for this item
        if (!event.availableTickets || localWishlist[event.id] < 0) {
          localWishlist[event.id] = 0;
          localStorageHelper.updateLocalWishlist(localWishlist);
        }

        // If the localWishlist has more items, then available,
        // that means the Event has been updated on the Eventbrite site,
        // So reset this wish list item in local storage
        if (localWishlist[event.id] > event.availableTickets) {
          localStorageHelper.resetWishListItem(event.id);
        }

        // If there is enough available tickets, get the data from local cache and update the event data
        if (localWishlist[event.id] <= event.availableTickets) {
          event.ticketsWishList = localWishlist[event.id];
          event.availableTickets -= localWishlist[event.id];
        }
      }

      // Uses Immer behind the scenes so it is safe to mutate state directly
      state.events.push(event);
      state.totalWishList = totalWishlistEvents;
    },
    createEvent(state, action) {
      state.events.unshift(action.payload);
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
