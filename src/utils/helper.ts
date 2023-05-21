import {IMAGE_BASE} from '@src/config';
import {Platform} from 'react-native';

export const inputHelper = (
  key: any,
  handleChange: any,
  handleBlur: any,
  values: any,
  errors: any,
  touched: any,
) => ({
  onChangeText: handleChange(key),
  onBlur: handleBlur(key),
  value: values[key],
  error: errors[key] && touched[key] ? errors[key] : undefined,
});

export const createFormData = (name: string, photo: any, body: any = {}) => {
  const data = new FormData();

  data.append(name, {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const renderImage = (url: string) => {
  return `${IMAGE_BASE}${url}`;
};
