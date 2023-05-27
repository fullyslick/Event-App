import EventsList from "../components/EventList";
import { useSelector } from 'react-redux';
import Notification from "../components/UI/Notification";

const Home = () => {
    const events = useSelector(state => state.events.events);
    const notification = useSelector(state => state.ui.notification);

    return (
        <>            
            <EventsList events={events} />
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </>
    );
};

export default Home;