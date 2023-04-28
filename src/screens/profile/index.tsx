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
import ProfileRating, {ProfileMenuItem} from '@components/profile-rating';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@utils/index';
const Profile = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const onEditProfile = () => {
    navigate('ProfileEdit');
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
                    uri: 'https://source.unsplash.com/random/200x200?sig=1',
                  }}
                  size={100}
                />
                <TouchableOpacity style={styles.cameraBtn}>
                  <CAMERA />
                </TouchableOpacity>
              </View>
              <Text style={styles.username}>Andrew Chadwick</Text>
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
              <ProfileMenuItem Icon={MANAGER} text="Manage Handler" />
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
