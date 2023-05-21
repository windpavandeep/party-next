import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PageContainer from '@components/Container';
import {Avatar} from 'react-native-ui-lib';
import {Color, FontFamily, FontSize} from 'src/utils/GlobalStyles';
import {
  CAMERA,
  MANAGER,
  MENU_CLUB,
  MENU_USER,
  QUESTION_HELP,
  SETTING,
} from '@assets/icons';
import * as ImagePicker from 'react-native-image-picker';
import ProfileRating, {ProfileMenuItem} from '@components/profile-rating';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@utils/index';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {createFormData, renderImage} from '@src/utils/helper';
import {imageChange} from '@src/services/auth.service';
import {updateUserAsync} from '@src/feature/auth/authApi';

const Profile = () => {
  const [image, setImage] = React.useState<any>(null);
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const onEditProfile = () => {
    navigate('ProfileEdit');
  };

  const onPressImageChange = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      const data = new Date();

      setImage(res);
      const imageRes = await imageChange(
        createFormData('image', res?.assets?.[0], {}),
        user?.id,
      );
      const ext: any = (res?.assets?.[0]?.fileName ?? '').split('.').pop();
      const imageName = `${user?.id}-profile.${ext}`;

      const userUpdated = {
        ...user,
        image: imageName,
        updated: data.getTime(),
      };
      delete userUpdated.token;
      dispatch(updateUserAsync(userUpdated));
    } catch (error) {
      console.log(' == error ===> ', error);
    }
  };

  return (
    <>
      <PageContainer useSafeArea={false}>
        <>
          <View style={styles.container}>
            <View style={styles.itemContainer}>
              <View>
                <Avatar
                  source={{
                    uri:
                      image?.assets?.[0]?.uri ||
                      renderImage(user?.image) ||
                      'https://source.unsplash.com/random/200x200?sig=1',
                  }}
                  size={100}
                />
                <TouchableOpacity
                  onPress={onPressImageChange}
                  style={styles.cameraBtn}>
                  <CAMERA />
                </TouchableOpacity>
              </View>
              <Text style={styles.username}>{user?.name}</Text>
            </View>
            <View style={[styles.itemContainer, {marginTop: 15}]}>
              <ProfileRating />
            </View>
            <View style={[styles.itemContainer, {marginTop: 35}]}>
              <ProfileMenuItem
                onPress={onEditProfile}
                Icon={MENU_USER}
                text="Edit Profile Details"
              />
              <ProfileMenuItem
                onPress={() => navigate('CreateClub')}
                Icon={MENU_CLUB}
                text="Edit Club Details"
              />
              <ProfileMenuItem
                Icon={MANAGER}
                text="Manage Handler"
                onPress={() => navigate('Handler')}
              />
              <ProfileMenuItem
                onPress={() => navigate('Settings')}
                Icon={SETTING}
                text="Settings"
              />
              <ProfileMenuItem Icon={QUESTION_HELP} text="Help & Support" />
            </View>
          </View>
        </>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  username: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.textWhiteFFFFFF,
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default Profile;
