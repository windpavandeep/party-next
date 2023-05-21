import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
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
import {CALL, MsgIcon, UserIcon} from '@assets/icons';
import {useAppSelector} from '@src/app/hooks';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const EditProfile = () => {
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const {goBack} = useNavigation();
  const onSubmit = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile update successfully.',
    });
    goBack();
  };
  return (
    <PageContainer useSafeArea={false}>
      <>
        <View style={styles.inputContianer}>
          <AppInput
            IconSvg={<UserIcon />}
            placeholder="Enter Full Name"
            label="Full Name"
            value={user.name}
          />
          <View style={styles.divider} />
          <AppInput
            IconSvg={<MsgIcon />}
            placeholder="Email Address"
            label="Email"
            value={user.email}
            extraItem={
              <TouchableOpacity style={styles.phnVerify}>
                <Text style={[styles.phnVerifyText, {color: Color.text_green}]}>
                  Verified
                </Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.divider} />
          <AppInput
            IconSvg={<CALL />}
            placeholder="331-623-8416"
            label="Phone Number"
            value={user.mobile}
            extraItem={
              <TouchableOpacity style={styles.phnVerify}>
                <Text style={styles.phnVerifyText}>Verify</Text>
              </TouchableOpacity>
            }
          />
        </View>

        <View style={styles.buttonContianer}>
          <GradientButton onPress={onSubmit} text="Save" />
        </View>
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  phnVerifyText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.text_blue,
  },
  phnVerify: {
    position: 'absolute',
    right: 12,
    top: 42,
  },
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

export default EditProfile;
