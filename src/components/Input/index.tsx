import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {FontFamily, FontSize, Color, Border} from '@utils/GlobalStyles';
import {KeyboardTypeOptions} from 'react-native';
import {Picker} from 'react-native-ui-lib';
import {ARROW_DOWN} from '@assets/icons';

interface Props {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  inputStyle?: Pick<TextInputProps, 'style'> | any;
  IconSvg?: JSX.Element;
  multiline?: boolean;
  numberOfLines?: number;
  extraItem?: JSX.Element;
}

interface PickerProps extends Props {}

const AppInput = ({
  label,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  inputStyle,
  IconSvg,
  extraItem,
  ...rest
}: Props) => {
  return (
    <>
      <View style={styles.container}>
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
            },
          ]}
          placeholder={placeholder}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Color.textWhiteFFFFFF}
          {...rest}
        />
        <View style={styles.iconContainer}>{IconSvg}</View>
      </View>
    </>
  );
};

export const InputPicker = ({label, inputStyle}: PickerProps) => {
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
          value={'Club'}
          placeholder={'Placeholder'}
          onChange={() => console.log('changed')}>
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
