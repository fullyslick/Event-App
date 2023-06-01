import { uiActions } from './ui-slice';

export const animateCounter = () => {
  return (dispatch) => {
    dispatch(uiActions.toggleIsCounter(true));

    setTimeout(() => {
      dispatch(uiActions.toggleIsCounter(false));
    }, 200);
  };
};
