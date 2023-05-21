import * as yup from 'yup';

export const clubCreateFormScheme = yup.object({
  name: yup.string().required('Please enter the name.'),
  mobile: yup.string().required('Please enter the phone number.'),
  banner: yup.string().required('Please add banner'),
  location: yup.string().required('Please add location'),
  country_code: yup.string().required('Please enter the country code'),
  zipcode: yup.string().required('Please enter the zip code'),
  description: yup.string().required('Please enter the description'),
});
