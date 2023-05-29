const storageKey = 'userEventData';

const initialCache = {
    wishlist: {}
}

const helperModule = () => {
    function initStorage() {
        if (!hasLocalStorageData()) {
            localStorage.setItem(storageKey, JSON.stringify(initialCache));
        }
    }

    function getLocalWishlist() {
        if (hasLocalStorageData()) {
            return JSON.parse(localStorage.getItem(storageKey)).wishlist;
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

        initStorage();
        updateStorage('wishlist', eventStorageObj);
    }

    function updateLocalWishlist(data) {
        if (!hasLocalStorageData()) {
            initStorage();
        }       
        updateStorage('wishlist', data);
    }

    function resetWishListItem(eventId) {
        const localStorageWishlist = JSON.parse(localStorage.getItem(storageKey)).wishlist;

        localStorageWishlist[eventId] = 0;

        updateLocalWishlist(localStorageWishlist);
    }

    function updateStorage(cacheItemKey, cacheItemData) {
        if (!hasLocalStorageData()) {
            initStorage();
        }
        const cache = JSON.parse(localStorage.getItem(storageKey));

        cache[cacheItemKey] = cacheItemData;

        localStorage.setItem(storageKey, JSON.stringify(cache));
    }

    return {
        initStorage: initStorage,
        rebuiltStorage: rebuiltStorage,
        updateLocalWishlist: updateLocalWishlist,
        resetWishListItem: resetWishListItem,
        hasLocalStorageData: hasLocalStorageData,
        getLocalWishlist: getLocalWishlist,
        updateStorage: updateStorage        
    }
};

const localStorageHelper = helperModule();

export default localStorageHelper;