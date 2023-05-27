import { createSlice } from "@reduxjs/toolkit";

const initialEventState = {
    events: [],
    totalWishList: 0
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialEventState,
    reducers: {
        addToWishLst(state, action) {
            const id = action.payload;
             // TODO:
             // Is availableTickets for this event are 0 return early        
             // Should find event by id
             // Increment its wishlist + 1
             // Update available tickets for this event
             // Update totalWishList
             // Update Total Price
             // Increment total price with the price of event ticket   
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
        }   ,
        replaceEvents(state, action) {             
            state.events = action.payload.events;
            state.totalWishList = action.payload.totalWishList;
        }
          
    }
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;