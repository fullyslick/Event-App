import ContentWrapper from "../components/Layout/ContentWrapper";

const WishList = () => {
    // Should load get all Events data only if they do not exist in Redux
    // This is performance optimization
    return (
        <div>
            <ContentWrapper title="Wish List">
                Wish List
            </ContentWrapper>
        </div>
    );
}

export default WishList;