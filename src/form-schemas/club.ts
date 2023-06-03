import * as yup from 'yup';

export const clubCreateFormScheme = yup.object({
  name: yup.string().required('Please enter the name.'),
  mobile: yup
    .string()
    .min(10)
    .max(10)
    .required('Please enter the phone number.'),
  location: yup.string().required('Please add location'),
  zipcode: yup.string().max(6,"Please enter the valid zipcode.").required('Please enter the zip code'),
  description: yup.string().required('Please enter the description'),
});
