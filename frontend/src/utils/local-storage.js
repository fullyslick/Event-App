const helperModule = () => {
    function initStorage() {
        if (!localStorage.getItem('eventsWishlist')) {
            localStorage.setItem('eventsWishlist', JSON.stringify({}));
          }
    }

    function rebuiltStorage(events) {
        let eventStorageObj = {};

        events.forEach(event => {
            if (event.ticketsWishList) {
                eventStorageObj[event.id] = event.ticketsWishList;
            }
        });

        localStorage.setItem('eventsWishlist', JSON.stringify(eventStorageObj));
    }

    function updateStorage(data) {
        localStorage.setItem('eventsWishlist', JSON.stringify(data));
    }

    function resetWishListItem(eventId) {
        const localStorageWishlist = JSON.parse(localStorage.getItem('eventsWishlist'));

        localStorageWishlist[eventId] = 0;

        updateStorage(localStorageWishlist);
    }

    return {
        initStorage: initStorage,
        rebuiltStorage: rebuiltStorage,
        updateStorage: updateStorage,
        resetWishListItem: resetWishListItem
    }
};

const localStorageHelper = helperModule();

export default localStorageHelper;