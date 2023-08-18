import React, { SelectHTMLAttributes } from 'react';
import { useField } from 'formik';

import styles from './Form.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select: React.FC<SelectProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name!);
  return (
    <div className={styles['form__item']}>
      <label className={styles['form__label']} htmlFor={name}>
        {label}
      </label>
      <select
        className={styles['form__select']}
        id={name}
        {...field}
        {...props}
      />
      <div
        className={`${styles['form__error']} ${
          meta.touched && meta.error ? styles['form__error--active'] : ''
        }`}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default Select;
