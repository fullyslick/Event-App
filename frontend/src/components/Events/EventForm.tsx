import { useSelector, useDispatch } from 'react-redux';
import { addNewEvent } from '../../store/event-actions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import { selectIsLoading } from '../../store/ui-slice';

import { Formik, Form, FormikHelpers } from 'formik';
import validationSchema from '../../validators/validation-schema';

import Input from '../Form/Input';
import TextArea from '../Form/TextArea';
import DatePickerField from '../Form/DatePicker';
import Select from '../Form/Select';
import Loader from '../UI/Loader';

import categoryNames from '../../utils/category-names';

import { selectEvents } from '../../store/events-slice';
import { AppDispatch } from '../../store';
import { transformNewEventData } from '../../utils/transform-event-data';
import styles from './EventForm.module.css';

import { NewEvent } from '../../types';

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const EventForm = () => {
  const isLoading = useSelector(selectIsLoading);
  const events = useSelector(selectEvents);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const newEventId = useRef('');

  const handleFormSubmit = (
    values: NewEvent,
    props: FormikHelpers<NewEvent>
  ) => {
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
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // next day same time
        location: '',
        address: '',
        image: '',
        category: '',
        capacity: 1,
        price: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form className={styles.eventForm}>
        {isLoading && (
          <>
            <div className={styles.eventFormLoaderOverlay}></div>
            <Loader />
          </>
        )}
        <Input
          label='Title'
          name='title'
          type='text'
          maxLength={140}
          placeholder='Event Title'
        />
        <Input
          label='Event Image Url'
          name='image'
          type='text'
          placeholder='https://myimage.jpg'
        />
        <TextArea
          label='Summary'
          name='summary'
          maxLength={140}
          placeholder='Summary'
        />
        <DatePickerField
          label='When'
          name='date'
          minDate={nextDay}
          onChange={() => {}}
        />
        <Input
          label='Location'
          name='location'
          type='text'
          maxLength={140}
          placeholder='e.g. Royal Albert Hall'
        />
        <Input
          label='Address'
          name='address'
          type='text'
          maxLength={140}
          placeholder='Street Name, Number, Post Code'
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
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
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
          placeholder='e.g 1.25'
        />
        <button
          className={styles.eventFormSubmitBtn}
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
