import React, { TextareaHTMLAttributes } from 'react';
import { useField } from 'formik';

import styles from './Form.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...props }) => {
  const [field, meta] = useField(name!);

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={styles.formTextArea}
        id={name}
        {...field}
        {...props}
      />
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

export default TextArea;
