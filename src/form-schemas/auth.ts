import * as yup from 'yup';

export const signupFormScheme = yup.object({
  name: yup.string().required('Please enter the name.'),
  mobile: yup.string().required('Please enter the phone number.'),
  email: yup
    .string()
    .email('Please enter the valid email address.')
    .required('Please enter the email address.'),
  password: yup
    .string()
    .required('Please enter the password.')
    .min(8, 'Password must be at least 8 characters.'),
});

export const profileEditScheme = yup.object({
  name: yup.string().required('Please enter the name.'),
  mobile: yup.string().required('Please enter the phone number.'),
  email: yup
    .string()
    .email('Please enter the valid email address.')
    .required('Please enter the email address.'),
});

export const loginFormScheme = yup.object({
  username: yup.string().required('Please enter email or phone number.'),
  password: yup.string().required('Please enter the password.'),
});
