import React, { TextareaHTMLAttributes } from 'react';
import { useField } from 'formik';

import classes from './Form.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name!);

  return (
    <div className={classes['form__item']}>
      <label className={classes['form__label']} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={classes['form__text-area']}
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

export default TextArea;
