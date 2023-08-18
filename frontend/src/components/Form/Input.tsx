import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';

import styles from './Form.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name!);

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel} htmlFor={name}>
        {label}
      </label>
      <input className={styles.formInput} id={name} {...field} {...props} />
      <div
        className={`${styles.formError} ${
          meta.touched && meta.error ? styles.formErrorActive : ''
        }`}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default Input;
