import ContentWrapper from "../components/Layout/ContentWrapper";
import MainNavigation from "../components/Layout/MainNavigation";

const EventDetail = () => {
    return (
        <div>
            <MainNavigation />
            <ContentWrapper title="Event Details">
                Event ID
            </ContentWrapper>
        </div>
    );
}

export default EventDetail;