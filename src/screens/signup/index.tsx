import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
import {CALL, LOCK, MsgIcon, UserIcon} from '@assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';
import {Formik} from 'formik';
import {signupFormScheme} from '@src/form-schemas/auth';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {userSignupAsync} from '@src/feature/auth/authApi';
import {SignupPayloadTypes} from '@src/types/auth.types';

const SignUp = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(({authUser}) => authUser);
  const onFormSubmit = (values: any) => {
    const data = new Date();
    const payload: SignupPayloadTypes = {
      name: values.name,
      username: values.email,
      email: values.email,
      mobile: values.mobile,
      country_code: '91',
      password: values.password,
      role: 'owner',
      created: data.getTime(),
      updated: data.getTime(),
    };
    dispatch(userSignupAsync(payload)).then(res => {
      const status: any = res.meta.requestStatus;
      if (status === 'fulfilled') {
        navigate('CreateClub');
      }
    });
  };
  return (
    <PageContainer>
      <Formik
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirm_password: '',
        }}
        validationSchema={signupFormScheme}
        onSubmit={onFormSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.header}>
              <Text style={styles.text}>Signup</Text>
              <Text style={styles.typeTheVerification}>
                Signup into your account
              </Text>
            </View>

            <View style={styles.inputContianer}>
              <AppInput
                IconSvg={<UserIcon />}
                placeholder="Enter Full Name"
                label="Full Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                error={errors.name && touched.name ? errors.name : undefined}
              />
              <View style={styles.divider} />
              <AppInput
                IconSvg={<MsgIcon />}
                placeholder="Email Address"
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email && touched.email ? errors.email : undefined}
              />
              <View style={styles.divider} />
              <AppInput
                IconSvg={<CALL />}
                placeholder="331-623-8416"
                label="Phone Number"
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                maxLength={10}
                error={
                  errors.mobile && touched.mobile ? errors.mobile : undefined
                }
              />
              <View style={styles.divider} />
              <AppInput
                IconSvg={<LOCK />}
                placeholder="Enter Password"
                label="Create Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={
                  errors.password && touched.password
                    ? errors.password
                    : undefined
                }
              />
              <View style={styles.divider} />
              <AppInput
                IconSvg={<LOCK />}
                placeholder="Enter Password"
                label="Confirm Password"
                secureTextEntry
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                value={values.confirm_password}
                error={
                  errors.confirm_password && touched.confirm_password
                    ? errors.confirm_password
                    : undefined
                }
              />
            </View>

            <View style={styles.textContianer}>
              <Text style={styles.bottomText}>
                By tapping Sign up, you agree to our Terms and Policy
              </Text>
            </View>

            <View style={styles.buttonContianer}>
              <GradientButton
                loading={!!loading}
                onPress={handleSubmit}
                text="Sign up"
              />
            </View>

            <View style={styles.textContianer}>
              <Text style={[styles.typeTheVerification, {textAlign: 'center'}]}>
                Already have an account?{' '}
                <Text
                  onPress={() => navigate('Login')}
                  style={{color: Color.textWhiteFFFFFF}}>
                  Log In
                </Text>
              </Text>
            </View>
          </>
        )}
      </Formik>
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
    marginTop: 44,
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

export default SignUp;
