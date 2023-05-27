import EventsList from "../components/Events/EventList";
import { useSelector } from 'react-redux';
import Notification from "../components/UI/Notification";
import ContentWrapper from "../components/Layout/ContentWrapper";

const Home = () => {
    const events = useSelector(state => state.events.events);
    const notification = useSelector(state => state.ui.notification);

    return (
        <ContentWrapper title="Events">           
            <EventsList events={events} />
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </ContentWrapper>
    );
};

export default Home;