import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLANKSTAR, FILLSTAR} from '@assets/icons';
import {Color, FontFamily, FontSize} from 'src/utils/GlobalStyles';

const ProfileRating = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toburg Club</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(i => {
          return (
            <View style={styles.staritem} key={i}>
              {i < 4 ? <FILLSTAR /> : <BLANKSTAR />}
              <View
                style={{
                  width: 5,
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

interface Props {
  Icon?: JSX.Element | any;
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const ProfileMenuItem = ({Icon, text, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItemContainer}>
      {Icon && <Icon />}
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuText: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
    marginLeft: 20,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 65,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.gray_200,
  },
  staritem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  text: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
  },
  container: {
    height: 76,
    width: 185,
    backgroundColor: Color.gray_300,
    borderWidth: 1,
    borderColor: Color.gray_200,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default ProfileRating;
