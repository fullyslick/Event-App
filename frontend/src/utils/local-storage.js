const helperModule = () => {
    function initStorage() {    
        if (!hasLocalStorageData()) {
            localStorage.setItem('eventsWishlist', JSON.stringify({}));
          }
    }

    function getLocalStorageData() {
        if (hasLocalStorageData()) {
            return JSON.parse(localStorage.getItem('eventsWishlist'))
        }

        return {};
    }

    function hasLocalStorageData() {
        return !!localStorage.getItem('eventsWishlist');
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
        resetWishListItem: resetWishListItem,
        hasLocalStorageData: hasLocalStorageData,
        getLocalStorageData: getLocalStorageData
    }
};

const localStorageHelper = helperModule();

export default localStorageHelper;