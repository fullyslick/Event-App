import classes from './ContentWrapper.module.css';

const ContentWrapper = ({ title, children }) => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default ContentWrapper;