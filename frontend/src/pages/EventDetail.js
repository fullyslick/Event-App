import ContentWrapper from "../components/Layout/ContentWrapper";
import MainNavigation from "../components/Layout/MainNavigation";

const EventDetail = () => {
    // Call API to get data about this event only if the entry do not exist in Redux

    return (
        <div>            
            <ContentWrapper title="Event Details">
                Event ID
            </ContentWrapper>
        </div>
    );
}

export default EventDetail;