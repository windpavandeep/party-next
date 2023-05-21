import {
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
import {Picker} from 'react-native-ui-lib';
import {ARROW_DOWN} from '@assets/icons';

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
  ...rest
}: Props) => {
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.caption}>{label}</Text>
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
          placeholderTextColor={Color.textWhiteFFFFFF}
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

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 5,
    marginTop: 5,
    color: Color.crimson,
    fontSize: 12,
    textAlign: 'left',
    position: 'absolute',
    bottom: -22,
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
