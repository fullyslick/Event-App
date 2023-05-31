import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import classes from './Form.module.css';

export const DatePickerField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <div className={classes['form__item']}>
      <label
        className={classes['form__label']}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        showTimeSelect
        dateFormat='Pp'
        id={props.name}
        className={classes['form__input']}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
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

export default DatePickerField;

DatePickerField.defaultProps = {
  label: '',
  props: {},
};

DatePickerField.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
};
