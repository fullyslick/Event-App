import * as Yup from 'yup';
import testImageSrc from './yup-validate-image-url';
import categoryNames from '../utils/category-names';

const categories = categoryNames.map((categoryName) => categoryName.name);

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  summary: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  location: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  image: Yup.string()
    .test('valid-image-url', 'Must use valid image URL', (value) =>
      testImageSrc(value, 1000).then((status) => status === 'success')
    )
    .required('Required'),
  category: Yup.string()
    .oneOf(categories, 'Invalid Category Type')
    .required('Required'),
  capacity: Yup.number()
    .min(1, 'Minimum capacity should be at least 1')
    .required('Required'),
  price: Yup.number().min(1, 'Minimum price is 1.00').required('Required'),
});

export default validationSchema;
