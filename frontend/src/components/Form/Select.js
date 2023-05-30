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
      <select id={props.name} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
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
