import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {FontFamily, FontSize, Color, Border} from '@utils/GlobalStyles';
import {KeyboardTypeOptions} from 'react-native';
import {Picker, DateTimePicker} from 'react-native-ui-lib';
import {ARROW_DOWN} from '@assets/icons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useEffect, useRef} from 'react';

// import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  inputStyle?: Pick<TextInputProps, 'style'> | any;
  IconSvg?: JSX.Element;
  multiline?: boolean;
  numberOfLines?: number;
  extraItem?: JSX.Element;
  onChangeText?: any;
  onBlur?: any;
  value?: any;
  error?: string | any;
  containerStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  placeholderColor?: ColorValue | any;
  maxLength?: number;
  ref?: any;
}

interface PickerProps extends Props {
  mode?: string;
}

const AppInput = ({
  label,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  inputStyle,
  IconSvg,
  extraItem,
  error,
  containerStyle,
  placeholderColor,
  ...rest
}: Props) => {
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.caption}>{label}</Text>}
        {extraItem}
        <TextInput
          style={[
            styles.groupChild,
            styles.groupChildLayout,
            inputStyle,
            {
              ...(!IconSvg && {
                paddingLeft: 12,
              }),
              ...(error && {
                borderWidth: 1,
                borderColor: Color.crimson,
              }),
            },
          ]}
          placeholder={placeholder}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={
            placeholderColor ? placeholderColor : Color.textWhiteFFFFFF
          }
          {...rest}
        />
        <View style={styles.iconContainer}>{IconSvg}</View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </>
  );
};

export const InputPicker = ({
  label,
  inputStyle,
  onChangeText,
  value,
  ...rest
}: PickerProps) => {
  return (
    <>
      <View style={styles.container}>
        {label && <Text style={styles.caption}>{label}</Text>}
        <Picker
          style={[
            styles.groupChild,
            styles.groupChildLayout,
            inputStyle,
            {paddingLeft: 12},
          ]}
          value={value}
          placeholder={'Placeholder'}
          onChange={onChangeText}
          {...rest}>
          <Picker.Item key={0} value={'Club'} label={'Club'} />
          <Picker.Item key={1} value={'Bar'} label={'Bar'} />
        </Picker>
        <View style={styles.arrowIcon}>
          <ARROW_DOWN />
        </View>
      </View>
    </>
  );
};

export const InputTimePicker = ({
  label,
  inputStyle,
  onChangeText,
  value,
  ...rest
}: PickerProps) => {
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.groupChild, styles.groupChildLayout, inputStyle]}>
          <DateTimePicker
            value={new Date()}
            mode="time"
            style={{
              color: Color.textWhiteFFFFFF,
            }}
          />
        </View>
      </View>
    </>
  );
};

export const LabelTypo = ({
  label,
  fontSize,
  textStyle,
}: {
  label: string;
  fontSize?: number;
  textStyle?: any;
}) => (
  <Text
    style={[
      styles.caption,
      {...(fontSize && {fontSize: fontSize})},
      textStyle,
    ]}>
    {label}
  </Text>
);

export const InputDatePicker = ({
  label,
  inputStyle,
  onChangeText,
  value,
  ...rest
}: PickerProps) => {
  return (
    <>
      <View style={styles.container}>
        <DateTimePicker
          style={[styles.groupChild, styles.groupChildLayout, inputStyle]}
          mode="date"
          placeholder="Choose a Ticket Purchase Deadline"
          label={label}
          onChange={onChangeText}
        />
      </View>
    </>
  );
};

export const GoogleAutoComplete = ({
  label,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  inputStyle,
  IconSvg,
  extraItem,
  error,
  containerStyle,
  placeholderColor,
  onChangeText,
  value,
  ...rest
}: Props) => {
  const ref = useRef();
  useEffect(() => {
    if (value) {
      const d: any = ref.current;
      d.setAddressText(value);
    }
  }, []);
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.caption}>{label}</Text>}
        {extraItem}
        <View style={[styles.iconContainer, {bottom: 19}]}>{IconSvg}</View>
        <GooglePlacesAutocomplete
          ref={ref}
          styles={{
            container: {
              flex: 1,
              width: 335,
            },
            textInput: {
              ...styles.groupChild,
              ...styles.groupChildLayout,
              ...inputStyle,
              ...(!IconSvg && {
                paddingLeft: 12,
              }),
              ...(error && {
                borderWidth: 1,
                borderColor: Color.crimson,
              }),
            },
            row: {
              backgroundColor: Color.text_black,
            },
            description: {
              color: Color.textWhiteFFFFFF,
            },
            poweredContainer: {display: 'none'},
          }}
          placeholder="Search"
          onPress={(data, details = null) => {
            onChangeText(data, details);
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyBokV1RP-r5g0DelpH_Dv9CfpFfjJZ6Fg0',
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          listViewDisplayed={false}
          {...rest}
        />

        {error && (
          <Text
            style={[
              styles.errorText,
              {
                bottom: -19,
              },
            ]}>
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 5,
    marginTop: 5,
    color: Color.crimson,
    fontSize: 12,
    textAlign: 'left',
    position: 'absolute',
    bottom: -24,
    left: 5,
  },
  arrowIcon: {
    position: 'absolute',
    right: 15,
    bottom: 40,
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 15,
    left: 12,
  },
  groupChildLayout: {
    height: 48,
    width: 335,
  },
  caption: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    color: Color.textWhiteFFFFFF,
  },
  groupChild: {
    marginTop: 10,
    backgroundColor: Color.gray_300,
    borderStyle: 'solid',
    borderColor: '#4e4e4e',
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    paddingLeft: 40,
    color: Color.textWhiteFFFFFF,
  },
});

export default AppInput;
