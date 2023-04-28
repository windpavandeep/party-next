import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  MarginTop,
} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import AppInput from '@components/Input';

const ChangePassword = () => {
  return (
    <PageContainer useSafeArea={false}>
      <>
        <View style={styles.inputContianer}>
          <AppInput
            // IconSvg={<LOCK />}
            placeholder="Current Password"
            label="Current Password"
            secureTextEntry
          />
          <View style={styles.divider} />
          <AppInput
            // IconSvg={<LOCK />}
            placeholder="New Password"
            label="New Password"
            secureTextEntry
          />
          <View style={styles.divider} />
          <AppInput
            // IconSvg={<LOCK />}
            placeholder="Confirm New Password"
            label="Confirm New Password"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContianer}>
          <GradientButton text="Change Password" />
        </View>
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  textContianer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginTop: 20,
  },
  buttonContianer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption1: {
    marginTop: 10,
    opacity: 0.7,
  },
  inputContianer: {
    marginTop: 22,
    flexDirection: 'column',
    alignItems: 'center',
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
  bottomText: {
    color: Color.gray_200,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: FontSize.size_xs,
    marginTop: MarginTop.m_gtext,
  },
});

export default ChangePassword;
