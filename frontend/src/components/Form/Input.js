import PropTypes from 'prop-types';
import { useField } from 'formik';

import classes from './Form.module.css';

const Input = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div className={classes['form__item']}>
      <label
        className={classes['form__label']}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={classes['form__input']}
        id={props.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={classes['form__error']}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;

Input.defaultProps = {
  label: '',
  props: {},
};

Input.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
};
