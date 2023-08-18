import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

import classes from './Form.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <div className={classes['form__item']}>
      <label className={classes['form__label']} htmlFor={name}>
        {label}
      </label>
      <input
        className={classes['form__input']}
        id={name}
        {...field}
        {...props}
      />
      <div
        className={`${classes['form__error']} ${
          meta.touched && meta.error ? classes['form__error--active'] : ''
        }`}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default Input;
