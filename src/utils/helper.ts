import {IMAGE_BASE} from '@src/config';
import {Platform} from 'react-native';

export const inputHelper = (
  key: any,
  handleChange: any,
  handleBlur: any,
  values: any,
  errors: any,
  touched: any,
) => {
  return {
    onChangeText: handleChange(key),
    onBlur: handleBlur(key),
    value: values[key],
    error: errors[key] || touched[key] ? errors[key] : undefined,
  };
};

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

export const convertAddressComponents = (addrComp: any) => {
  let newAddr: any = {};
  let address_1: any = [];
  addrComp.forEach((el: any, i: any) => {
    if (el.types.includes('post_box')) {
      address_1.push(el.long_name);
    } else if (el.types.includes('street_number')) {
      address_1.push(el.long_name);
    } else if (el.types.includes('route')) {
      address_1.push(el.long_name);
    } else if (el.types.includes('subpremise')) {
      newAddr.address_2 = el.long_name;
    } else if (el.types.includes('locality')) {
      newAddr.city = el.long_name;
    } else if (el.types.includes('administrative_area_level_1')) {
      newAddr.state = el.long_name;
    } else if (el.types.includes('postal_code')) {
      newAddr.zip_code = el.short_name;
    } else if (el.types.includes('country')) {
      newAddr.country = el.long_name;
    }
  });
  newAddr.address_1 = address_1.join(' ');

  return newAddr;
};
