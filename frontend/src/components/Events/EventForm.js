import { useSelector, useDispatch } from 'react-redux';
import { addNewEvent } from '../../store/event-actions';
import { useNavigate } from 'react-router-dom';

import { Formik, Form } from 'formik';
import validationSchema from '../../validators/validation-schema';

import Input from '../Form/Input';
import DatePickerField from '../Form/DatePicker';
import Select from '../Form/Select';
import Loader from '../UI/Loader';

import classes from './EventForm.module.css';
import categoryNames from '../../utils/category-names';
import { transformNewEventData } from '../../utils/transform-event-data';
import { useEffect, useRef } from 'react';

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const EventForm = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const events = useSelector((state) => state.events.events);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newEventId = useRef('');

  const handleFormSubmit = (values, props) => {
    const event = transformNewEventData(values);

    newEventId.current = event.id;

    dispatch(addNewEvent(event));

    props.setSubmitting(false);
  };

  // Detect when new event is added to Redux
  useEffect(() => {
    const isNewEventAdded = events.filter(
      (event) => event.id === newEventId.current
    ).length;

    if (isNewEventAdded) {
      // redirect user to the new event page
      navigate(`../event/${newEventId.current}`);
    }
  }, [events, navigate]);

  return (
    <Formik
      initialValues={{
        title: '',
        summary: '',
        date: '',
        location: '',
        address: '',
        image: '',
        category: '',
        capacity: '',
        price: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form className={classes['event-form']}>
        {isLoading && <Loader />}
        <Input
          label='Title'
          name='title'
          type='text'
          placeholder='Event Title'
        />
        <Input
          label='Summary'
          name='summary'
          type='text'
          maxLength={140}
          placeholder='Summary'
        />
        <DatePickerField label='When' name='date' minDate={nextDay} />
        <Input
          label='Location'
          name='location'
          type='text'
          placeholder='e.g. Royal Albert Hall'
        />
        <Input
          label='Address'
          name='address'
          type='text'
          placeholder='Street Name, Number, Post Code'
        />
        <Input
          label='Event Image Url'
          name='image'
          type='text'
          placeholder='https://myimage.jpg'
        />
        <Select label='Select Category' name='category'>
          <option value=''>Select category</option>
          {categoryNames.map((categoryName) => (
            <option key={categoryName.id} value={categoryName.name}>
              {categoryName.name}
            </option>
          ))}
        </Select>
        <Input
          label='Capacity'
          name='capacity'
          type='number'
          step='1'
          min='1'
          onKeyPress={(event) => {
            // Disallow decimals
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          placeholder='The max ticket quantity'
        />
        <Input
          label='Ticket Price'
          name='price'
          type='number'
          placeholder='e.g 1.25 or leave empty for free event'
        />
        <button
          className={classes['form__submit-btn']}
          type='submit'
          disabled={isLoading}
        >
          Create Event
        </button>
      </Form>
    </Formik>
  );
};

export default EventForm;
