import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.css';

interface DatePickerProps {
  label: string;
  name: string;
  minDate: Date;
}

export const DatePickerField: React.FC<DatePickerProps> = ({
  label = '',
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <div className={styles['form__item']}>
      <label className={styles['form__label']} htmlFor={props.name}>
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        showTimeSelect
        dateFormat='Pp'
        id={props.name}
        className={styles['form__input']}
        onChange={(_, event: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue(field.name, event.target.value);
        }}
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

export default DatePickerField;
