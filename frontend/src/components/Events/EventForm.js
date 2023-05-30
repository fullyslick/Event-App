import { Formik, Form } from 'formik';
import validationSchema from '../../validators/validation-shema';

import classes from './EventForm.module.css';
import categoryNames from '../../utils/category-names';

import Input from '../Form/Input';
import DatePickerField from '../Form/DatePicker';
import Select from '../Form/Select';

const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

const EventForm = () => {
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className={classes['event-form']}>
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
          placeholder='e.g 1.25 or 0 for free events'
        />
        <button type='submit'>Create Event</button>
      </Form>
    </Formik>
  );
};

export default EventForm;
