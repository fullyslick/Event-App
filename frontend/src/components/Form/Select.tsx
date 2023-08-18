import React, { SelectHTMLAttributes } from 'react';
import { useField } from 'formik';

import styles from './Form.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const Select: React.FC<SelectProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name!);
  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel} htmlFor={name}>
        {label}
      </label>
      <select className={styles.formSelect} id={name} {...field} {...props} />
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

export default Select;
