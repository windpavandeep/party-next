import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PageContainer from '@components/Container';
import {LongEventCard} from '@components/EventCard';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import {Avatar} from 'react-native-ui-lib';
import {TRASH, USERS_RECT} from '@src/assets/icons';
import GradientButton from '@src/components/Button';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {getClubUsersAsync} from '@src/feature/club/clubApi';
import {USER_PLACEHOLDER_PNG} from '@src/assets/images';
import {renderImage} from '@src/utils/helper';

interface ListProps {
  item: Object | any;
}

const UserListItem = ({item}: ListProps) => {
  return (
    <View style={styles.itemContainer}>
      <Avatar
        source={
          item?.image
            ? {
                uri: renderImage(item?.image),
              }
            : USER_PLACEHOLDER_PNG
        }
        size={50}
      />

      <View style={styles.detail}>
        <Text style={styles.textBold}>{item?.name}</Text>
        <Text style={styles.textSmall}>{item.email}</Text>
      </View>
      <TouchableOpacity
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={styles.trash}>
        <TRASH />
      </TouchableOpacity>
    </View>
  );
};

const Handler = () => {
  const {club, users, loading} = useAppSelector(
    ({clubSlice}) => clubSlice,
  ) as any;
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getClubUsersAsync(club?.club?.id));
  }, []);

  const FloatActionButton = () => {
    return (
      <View style={styles.floatBtn}>
        <GradientButton
          icon={<USERS_RECT />}
          style={{width: 160}}
          text="Create Handler"
          onPress={() => navigate('AddUser')}
        />
      </View>
    );
  };

  return (
    <>
      <PageContainer
        loading={loading}
        extraItems={<FloatActionButton />}
        useSafeArea={false}>
        <>
          <View style={styles.listView}>
            {(users?.users ?? []).map((i: any, index: any) => (
              <UserListItem key={index} item={i} />
            ))}
          </View>
        </>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  floatBtn: {
    position: 'absolute',
    zIndex: 99,
    bottom: 50,
    right: 10,
  },
  textBold: {
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_sm,
    color: Color.textWhiteFFFFFF,
  },
  textSmall: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    color: Color.gray_200,
  },
  detail: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  },
  trash: {},
  itemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  calendor: {
    backgroundColor: Color.gray_300,
  },
  calContianer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Color.gray_300,
  },
  listView: {
    flex: 1,
    marginTop: 20,
  },
});

export default Handler;
