import PropTypes from 'prop-types';
import { useField } from 'formik';

import classes from './Form.module.css';

const TextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <TextArea>. We can use field meta to show an error
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
      <textarea
        className={classes['form__text-area']}
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

export default TextArea;

TextArea.defaultProps = {
  label: '',
  props: {},
};

TextArea.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
};
