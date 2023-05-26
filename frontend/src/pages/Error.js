import { useRouteError } from "react-router-dom"
import MainNavigation from "../components/MainNavigation";
import ContentWrapper from "../components/ContentWrapper";

const Error = () => {
    // Detect error type    
    const error = useRouteError();

    let title = "An error occurred";
    let message = "Something went wrong";

    // used for invalid paths
    if (error.status === 404) {
        title = "Not found!";
        message = "Could not find resource or page.";
    }

    return (
        <div>
            <MainNavigation />
            <ContentWrapper title={title}>
                <p>{message}</p>
            </ContentWrapper>
        </div>);
};

export default Error;