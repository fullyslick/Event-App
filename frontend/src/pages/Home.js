import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getEventsData } from '../store/event-actions';

import EventsList from "../components/Events/EventList";
import Notification from "../components/UI/Notification";
import ContentWrapper from "../components/Layout/ContentWrapper";
import Loader from "../components/UI/Loader";
import SearchBar from '../components/UI/SearchBar';
import CategoryTags from '../components/UI/CategoryTags';

const Home = () => {
    const hasEvents = useSelector(state => state.events.areEventsReplaced);
    const events = useSelector(state => state.events.events);

    // Handles Search and Category filtering
    const categories = [...new Set(events.map(event => event.category))];
    const [selectedCategory, setSelectedCategory] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events.filter(event => {
        if (selectedCategory) {
            return event.category.includes(selectedCategory) && event.title.trim().toLowerCase().includes(searchQuery);
        } else {
            return event.title.trim().toLowerCase().includes(searchQuery)
        }
    });

    // Handles on load UI
    const notification = useSelector(state => state.ui.notification);
    const isLoading = useSelector(state => state.ui.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        // Get events data from API only if there is no data in Redux
        if (!hasEvents) {
            dispatch(getEventsData());
            return;
        }
        console.log('update');
    }, [dispatch, hasEvents]);

    const handleSearchChange = (event) => {
        const inputQuery = event.target.value.trim().toLowerCase();
        setSearchQuery(inputQuery);
    }

    const handleCategoryClick = (category) => {
        if (category === selectedCategory) {
            setSelectedCategory('');
            return;
        }

        setSelectedCategory(category);
    }

    return (
        <ContentWrapper title="Events">
            {isLoading ? <Loader /> : <>
                <SearchBar onInputChange={handleSearchChange} />
                <CategoryTags
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onTagClick={handleCategoryClick} />
                <EventsList events={filteredEvents} />
            </>}
            {notification && !isLoading &&
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message} />}
        </ContentWrapper>
    );
};

export default Home;