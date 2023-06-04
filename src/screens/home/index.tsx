import * as React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {FontSize, FontFamily, Color, Border} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import {ARROW_RIGHT, DANGER, LOCATION} from '@assets/icons';
import EventCard, {LongEventCard} from '@components/EventCard';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {getClubDetailAsync} from '@src/feature/club/clubApi';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';
import {getUserDetailAsync} from '@src/feature/auth/authApi';
import {onLogout} from '@src/feature/auth/authSlice';
import {getALlEventAsync} from '@src/feature/events/eventApi';

const Home = () => {
  const {loading} = useAppSelector(({clubSlice}) => clubSlice) as any;
  const [loader, setLoader] = React.useState<boolean>(false);
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const {list} = useAppSelector(({eventSlice}) => eventSlice);
  const {replace} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const now = Date.now();
  React.useEffect(() => {
    dispatch(getUserDetailAsync(user?.id)).then(res => {
      if (res.meta.requestStatus === 'rejected') {
        setLoader(true);
        setTimeout(() => {
          dispatch(onLogout());
          replace('Login');
          setLoader(false);
        }, 1000);
      }
      if (res.meta.requestStatus === 'fulfilled' && res.payload?.club == null) {
        if (user?.role === 'handler') {
          // Club is Is used as owner userId
          dispatch(getClubDetailAsync(user?.club_id)).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(getALlEventAsync(user?.club_id)); // Club is Is used as owner userId
            }
            if (
              res.meta.requestStatus === 'fulfilled' &&
              res.payload?.club == null
            ) {
              replace('CreateClub');
            }
          });
        } else {
          dispatch(getClubDetailAsync(user?.id)).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
              dispatch(getALlEventAsync(user?.id));
            }
            if (
              res.meta.requestStatus === 'fulfilled' &&
              res.payload?.club == null
            ) {
              replace('CreateClub');
            }
          });
        }
      }
    });
  }, []);

  console.log(' === res ==> ', user);

  return (
    <>
      <PageContainer loading={loader || loading} useSafeArea={false}>
        <>
          <View style={styles.rectangleParent}>
            <View style={styles.groupChild}>
              <DANGER />
              <Text style={[styles.hiYourEmail, styles.textTypo]}>
                Hi, Your email ID verification is pending
              </Text>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <Text style={[styles.tab]}>Ongoing Events</Text>
            <Text style={styles.tab1}>
              See all <ARROW_RIGHT />
            </Text>
          </View>
          <View style={styles.listView}>
            {(list ?? [])
              .filter((i: any) => {
                return new Date(i?.event_date).getTime() > now;
              })
              .map((i, index) => (
                <LongEventCard item={i} key={index} />
              ))}
            {(list ?? []).length <= 0 && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.size_lg,
                    color: Color.textWhiteFFFFFF,
                  }}>
                  No ongoing events
                </Text>
              </View>
            )}
          </View>

          <View style={styles.tabContainer}>
            <Text style={[styles.tab]}>Upcoming Events</Text>
            <Text style={styles.tab1}>
              See all <ARROW_RIGHT />
            </Text>
          </View>
          <View style={styles.cardEventItemContainer}>
            {(list ?? []).length <= 0 && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text
                  style={{
                    fontSize: FontSize.size_lg,
                    color: Color.textWhiteFFFFFF,
                  }}>
                  No upcoming events
                </Text>
              </View>
            )}
            <ScrollView horizontal>
              {(list ?? [])
                .filter((i: any) => {
                  return new Date(i?.event_date).getTime() < now;
                })
                .map((i: any, index: number) => (
                  <React.Fragment key={index}>
                    <EventCard item={i} />
                    <View style={styles.divider} />
                  </React.Fragment>
                ))}
            </ScrollView>
          </View>
        </>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: 10,
    height: 10,
  },
  cardEventItemContainer: {
    flex: 1,
    marginTop: 12,
  },
  // ITEM END
  listView: {
    // flex: 1,
    marginTop: 12,
  },
  tab1: {
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    color: Color.textWhiteFFFFFF,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    fontSize: FontSize.size_lg,
    lineHeight: 26,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    color: Color.textWhiteFFFFFF,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  groupChild: {
    backgroundColor: Color.warning_red,
    borderColor: Color.warning_red_border,
    borderWidth: 1,
    borderRadius: Border.br_7xs,
    height: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 12,
    marginBottom: 12,
  },
  rectangleParent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiYourEmail: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    paddingLeft: 12,
  },
  textTypo: {
    textAlign: 'center',
    color: Color.textWhiteFFFFFF,
    lineHeight: 14,
    fontSize: FontSize.size_3xs,
  },
});

export default Home;
