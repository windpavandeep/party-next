import * as React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  MarginTop,
} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';

const OTP = () => {
  return (
    <PageContainer>
      <>
        <View style={styles.header}>
          <Text style={styles.text}>00:42</Text>
          <Text style={styles.typeTheVerification}>
            Type the verification code we’ve sent you
          </Text>
        </View>
        <View style={styles.otpInputContianer}>
          <Text style={[styles.caption, styles.captionTypo]}>OTP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.groupChild, styles.groupLayout]}
              placeholder="Placeholder text"
              keyboardType="default"
            />
            <TextInput
              style={[styles.groupItem, styles.groupLayout]}
              placeholder="Placeholder text"
              keyboardType="default"
            />
            <TextInput
              style={[styles.groupInner, styles.groupLayout]}
              placeholder="Placeholder text"
              keyboardType="default"
            />
            <TextInput
              style={[styles.rectangleTextinput, styles.groupLayout]}
              placeholder="Placeholder text"
              keyboardType="default"
            />
          </View>
          <Text style={[styles.caption1, styles.captionTypo]}>Resend</Text>
        </View>
        <View style={styles.buttonContianer}>
          <GradientButton />
        </View>
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  buttonContianer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption1: {
    marginTop: 10,
    opacity: 0.7,
  },
  otpInputContianer: {
    marginTop: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  groupItem: {
    marginLeft: 10,
  },
  groupInner: {
    marginLeft: 10,
  },
  rectangleTextinput: {
    marginLeft: 10,
  },
  groupLayout: {
    width: 48,
    borderWidth: 1,
    borderColor: '#4e4e4e',
    borderStyle: 'solid',
    backgroundColor: Color.gray_300,
    borderRadius: Border.br_3xs,
    height: 48,
  },
  groupChild: {
    left: 0,
    borderWidth: 1,
    borderColor: '#4e4e4e',
    borderStyle: 'solid',
    backgroundColor: Color.gray_300,
  },
  captionTypo: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    color: Color.textWhiteFFFFFF,
  },
  caption: {
    fontSize: FontSize.size_xs,
  },
  header: {
    marginTop: 84,
    height: 67,
    width: 295,
  },
  text: {
    fontSize: FontSize.size_5xl,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: 'left',
    width: 295,
    color: Color.textWhiteFFFFFF,
  },
  typeTheVerification: {
    color: Color.gray_200,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    width: 295,
    fontSize: FontSize.size_sm,
    marginTop: MarginTop.m_gtext,
  },
});

export default OTP;
