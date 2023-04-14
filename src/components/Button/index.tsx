import {Pressable, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Border, Color, FontFamily, FontSize} from '@utils/GlobalStyles';

interface Props {
  text?: string;
}

const GradientButton = ({text}: Props) => {
  return (
    <TouchableOpacity style={styles.btnContinue}>
      <LinearGradient
        style={styles.container}
        locations={[0, 0, 1]}
        colors={['#823dd8', '#803dda', '#f80354']}
        useAngle={true}
        angle={268.55}
      />
      <Text style={styles.continue}>{`${text ? text : 'Continue'} `}</Text>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  btnContinue: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'transparent',
    borderRadius: Border.br_3xs,
    height: 48,
    width: 335,
  },
  continue: {
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsMedium,
    textAlign: 'center',
    color: Color.textWhiteFFFFFF,
    fontSize: FontSize.size_sm,
    position: 'absolute',
  },
});
