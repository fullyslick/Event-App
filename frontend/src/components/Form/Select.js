import PropTypes from 'prop-types';
import { useField } from 'formik';

import classes from './Form.module.css';

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={classes['form__item']}>
      <label
        className={classes['form__label']}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className={classes['form__select']}
        id={props.name}
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

export default Select;

Select.defaultProps = {
  label: '',
  props: {},
};

Select.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
};
