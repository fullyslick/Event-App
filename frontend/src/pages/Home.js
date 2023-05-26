import DUMMY_DATA from "../dummy-data"; // TODO remove
import EventsList from "../components/EventList";

const Home = () => {
    return <EventsList events={DUMMY_DATA} />
};

export default Home;