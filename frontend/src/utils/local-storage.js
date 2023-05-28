const storageKey = 'eventsWishlist';

const helperModule = () => {
    function initStorage() {    
        if (!hasLocalStorageData()) {
            localStorage.setItem(storageKey, JSON.stringify({}));
          }
    }

    function getLocalStorageData() {
        if (hasLocalStorageData()) {
            return JSON.parse(localStorage.getItem(storageKey))
        }

        return {};
    }

    function hasLocalStorageData() {
        return !!localStorage.getItem(storageKey);
    }

    function rebuiltStorage(events) {
        let eventStorageObj = {};

        events.forEach(event => {
            if (event.ticketsWishList) {
                eventStorageObj[event.id] = event.ticketsWishList;
            }
        });

        localStorage.setItem(storageKey, JSON.stringify(eventStorageObj));
    }

    function updateStorage(data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function resetWishListItem(eventId) {
        const localStorageWishlist = JSON.parse(localStorage.getItem(storageKey));

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