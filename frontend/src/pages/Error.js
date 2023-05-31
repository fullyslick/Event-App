import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/Layout/MainNavigation';
import Notification from '../components/UI/Notification';
import ContentWrapper from '../components/Layout/ContentWrapper';

const Error = () => {
  // Detect error type
  const error = useRouteError();

  let title = 'An error occurred';
  let message = 'Something went wrong';

  // used for invalid paths
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <div>
      <MainNavigation />
      <ContentWrapper title='Error'>
        <Notification status={'error'} title={title} message={message} />
      </ContentWrapper>
    </div>
  );
};

export default Error;
