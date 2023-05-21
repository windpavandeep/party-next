import {CROSS} from '@src/assets/icons';
import {Color, FontFamily, FontSize} from '@src/utils/GlobalStyles';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | any;
}
const Pill = ({text, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        onPress={() => onPress(text)}
        hitSlop={{top: 5, right: 20, left: 20, bottom: 5}}
        style={{marginLeft: 4, marginRight: 4}}>
        <CROSS />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderWidth: 1,
    borderRadius: 22,
    backgroundColor: Color.gray_200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    marginRight: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
  },
});

export default Pill;
