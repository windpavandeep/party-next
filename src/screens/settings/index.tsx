import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {FontSize, FontFamily, Color} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import {ARROW_RIGHT} from 'src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@utils/index';
import ModalAlert from 'src/components/Modal';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {onLogout} from '@src/feature/auth/authSlice';

const Settings = () => {
  const {navigate, replace} =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const dispatch = useAppDispatch();
  const onLogOutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(onLogout());
      setShowLogoutModal(false);
      replace('Login');
      setLoading(false);
    }, 1000);
  };
  return (
    <PageContainer loading={loading} useSafeArea={false}>
      <>
        <ModalAlert
          show={showDeleteModal}
          btnText={'Delete'}
          title="Delete account"
          subTitle="Are you sure you want to delete your account?"
          onClose={() => setShowDeleteModal(false)}
        />
        <ModalAlert
          show={showLogoutModal}
          btnText={'Logout'}
          title="Logout"
          subTitle="Are you sure you want to Logout your account?"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={onLogOutHandler}
        />
        {[
          {
            title: 'Privacy & Policy',
            showArrow: true,
          },
          {
            title: user?.role !== 'handler' ? 'Change Password' : undefined,
            showArrow: true,
            onPress: () => navigate('ChangePassword'),
          },
          {
            title: user?.role !== 'handler' ? 'Delete account' : undefined,
            showArrow: false,
            onPress: () => {
              setShowDeleteModal(true);
            },
          },
          {
            title: 'Logout',
            showArrow: false,
            onPress: () => {
              setShowLogoutModal(true);
            },
          },
        ]
          .filter(i => i?.title)
          .map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={item?.onPress}
                  style={styles.itemContainer}
                  key={index}>
                  <Text style={styles.itemText}>{item.title}</Text>
                  {item.showArrow && <ARROW_RIGHT />}
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            );
          })}
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    borderColor: Color.gray_200,
    width: '100%',
  },
  itemText: {
    color: Color.textWhiteFFFFFF,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
  },
  itemContainer: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Settings;
