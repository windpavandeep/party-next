import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Border, Color, FontFamily, FontSize} from '@utils/GlobalStyles';

interface Props {
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | any;
  loading?: boolean;
  icon?: JSX.Element;
}

const GradientButton = ({
  text,
  style,
  onPress,
  icon,
  loading = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnContinue, style]}>
      <LinearGradient
        style={[styles.container, style]}
        locations={[0, 0, 1]}
        colors={['#823dd8', '#803dda', '#f80354']}
        useAngle={true}
        angle={268.55}
      />

      {loading ? (
        <ActivityIndicator
          color={Color.textWhiteFFFFFF}
          size={'small'}
          style={styles.loader}
        />
      ) : (
        <>
          <Text
            style={[
              styles.continue,
              {
                ...(icon && {
                  left: 35,
                }),
              },
            ]}>{`${text ? text : 'Continue'} `}</Text>
          {!loading && icon && (
            <View style={{position: 'absolute', left: 10}}>{icon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
  },
  btnContinue: {
    height: 48,
    width: 335,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: 'transparent',
    borderRadius: Border.br_3xs,
    height: 48,
    width: 335,
    flexDirection: 'row',
    // alignItems: 'center',
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
