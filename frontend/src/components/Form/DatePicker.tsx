import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.css';

interface DatePickerProps extends ReactDatePickerProps {
  label: string;
}

export const DatePickerField: React.FC<DatePickerProps> = ({
  label,
  name,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name!);

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel} htmlFor={name}>
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        showTimeSelect
        dateFormat='Pp'
        id={name}
        className={styles.formInput}
        onChange={(date) => {
          setFieldValue(field.name, date);
        }}
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

export default DatePickerField;
