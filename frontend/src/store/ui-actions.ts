import { uiActions } from './ui-slice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export const animateCounter = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(uiActions.toggleIsCounter(true));

    setTimeout(() => {
      dispatch(uiActions.toggleIsCounter(false));
    }, 200);
  };
};
