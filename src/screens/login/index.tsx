import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FontFamily, FontSize, Border, Color} from '@utils/GlobalStyles';
import AppInput from '@components/Input';
import GradientButton from '@components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/utils';

const LoginScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.btnContinueParent}>
      <GradientButton text="Login" onPress={() => navigate('PrivateStack')} />
      <View style={[styles.header, styles.headerLayout]}>
        <Text style={styles.login1}>Login</Text>
        <Text style={[styles.loginIntoYour, styles.caption2Typo]}>
          Login into your account
        </Text>
      </View>
      <View style={[styles.captionParent, styles.captionLayout]}>
        <AppInput label="Password" />
        <Text style={[styles.placeholder1, styles.placeholderPosition]}>
          Get OTP
        </Text>
        {/* <Image
          style={[styles.vuesaxoutlinelockIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require('../assets/vuesaxoutlinelock.png')}
        /> */}
      </View>
      <View style={[styles.captionGroup, styles.captionLayout]}>
        <AppInput label="Email of Phone" />
        {/*        
        <Text style={[styles.placeholder, styles.placeholderPosition]}>
          Enter Email or Phone
        </Text> */}
      </View>
      <Text style={[styles.caption2, styles.caption2Typo]}>
        {/* <Text style={styles.dontHaveAn}>Don’t have an account?</Text> */}
        {/* <Text style={styles.signUp}> Sign up</Text> */}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 48,
    width: 335,
    position: 'absolute',
  },

  headerLayout: {
    width: 295,
    position: 'absolute',
  },
  caption2Typo: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
  },
  captionLayout: {
    height: 70,
    left: 22,
    width: 335,
    position: 'absolute',
  },
  placeholderPosition: {
    lineHeight: 16,
    top: '50%',
    marginTop: 3,
    fontSize: FontSize.size_xs,
    position: 'absolute',
  },
  iconLayout: {
    height: 20,
    width: 20,
    left: 12,
    position: 'absolute',
  },

  btnContinue: {
    top: 377,
    left: 20,
  },
  login1: {
    fontSize: FontSize.size_5xl,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: 'left',
    width: 295,
    color: Color.textWhiteFFFFFF,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  loginIntoYour: {
    top: 46,
    color: Color.gray_200,
    width: 295,
    position: 'absolute',
    fontSize: FontSize.size_sm,
    left: 0,
  },
  header: {
    top: 84,
    height: 67,
    left: 20,
  },
  caption: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    color: Color.textWhiteFFFFFF,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  groupChild: {
    top: 22,
    backgroundColor: Color.gray_300,
    borderStyle: 'solid',
    borderColor: '#4e4e4e',
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    left: 0,
  },
  placeholder1: {
    left: 273,
    color: Color.crimson,
    textAlign: 'right',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
  },
  vuesaxoutlinelockIcon: {
    top: 36,
  },
  captionParent: {
    top: 267,
  },
  vuesaxoutlinesmsIcon: {
    top: 35,
  },
  captionGroup: {
    top: 181,
  },
  dontHaveAn: {
    color: Color.gray_200,
    marginTop: 20,
  },
  signUp: {
    color: Color.textWhiteFFFFFF,
  },
  caption2: {
    top: 445,
    // left: 76,
    fontSize: FontSize.size_sm,
    position: 'absolute',
  },
  btnContinueParent: {
    backgroundColor: Color.gray_100,
    flex: 1,
    height: 812,
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
