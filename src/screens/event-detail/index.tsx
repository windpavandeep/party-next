import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PageContainer from '@components/Container';
import {Avatar, Carousel} from 'react-native-ui-lib';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import {useEffect, useMemo, useState} from 'react';
import {CALENDOR, OFFER_CODE, ROUNDER_LOCATION, SHARE} from '@assets/icons';
import TicketType from '@components/TicketType';
import Divider from '@components/Divider';
import GradientButton from '@components/Button';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@src/app/hooks';
import moment from 'moment';
import {daysInWeek, renderImage} from '@src/utils/helper';
import {getTicketWithEventId} from '@src/services/event.service';

const EventDetails = () => {
  const {params} = useRoute() as any;
  const {list} = useAppSelector(({eventSlice}) => eventSlice);
  const {club} = useAppSelector(({clubSlice}) => clubSlice) as any;
  const [eventDetail, setEventDetails] = useState<any>({});
  const [ticket, setTickets] = useState<any>([]);
  const [ticketLoading, setTicketLoading] = useState<boolean>(false);

  const IMAGES = useMemo(() => {
    return [renderImage(eventDetail?.cover_pic)];
  }, [eventDetail]);

  const CarouselRender = useMemo(
    () => (
      <Carousel key={112} loop>
        {IMAGES.map((i, index) => (
          <View key={index + 10} style={styles.sliderItem}>
            <Image
              source={{
                uri: i,
              }}
              style={{
                height: 240,
                width: '100%',
              }}
            />
          </View>
        ))}
      </Carousel>
    ),
    [eventDetail],
  );

  useEffect(() => {
    setEventDetails(list.find((i: any) => i?.id === params.id));
  }, []);

  const RenderDetailItemData = useMemo(
    () => [
      {
        icon: OFFER_CODE,
        title: `${eventDetail?.offer_name}% OFF`,
        boldText: 'Use Code:',
        smallText: `${eventDetail?.offer_code}`,
      },
      {
        icon: CALENDOR,
        title: moment(eventDetail?.event_date).format('MMMM DD, YYYY'),
        boldText: daysInWeek[moment(eventDetail?.event_date).day()],
        smallText: `${moment(eventDetail?.start_time).format(
          'HH:MM A',
        )} - ${moment(eventDetail?.end_time).format('HH:MM A')}`,
      },
      {
        icon: ROUNDER_LOCATION,
        title: undefined,
        boldText: undefined,
        smallText: eventDetail?.location,
      },
    ],
    [eventDetail],
  );

  useEffect(() => {
    const getTickets = async () => {
      setTicketLoading(true);
      try {
        const res = await getTicketWithEventId(eventDetail?.id);
        console.log(' == list ticket ===> ', res.data);
        setTickets(res.data);
      } catch (error) {
        console.log(' ==== error ===> ', error);
      } finally {
        setTicketLoading(false);
      }
    };
    getTickets();
  }, [eventDetail]);

  return (
    <>
      <PageContainer useSafeArea={false} disablePadding>
        <>
          <View style={[styles.headerContainer]}>{CarouselRender}</View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{eventDetail?.event_name}</Text>
            <Text style={styles.subTitle}>{club?.club?.name}</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tags}>
                <Text style={styles.tagText}>{eventDetail?.event_type}</Text>
                <Text style={[styles.tagText, {marginLeft: 5}]}>
                  {eventDetail?.event_time_type}
                </Text>
              </View>
              <View style={styles.avatarContianer}>
                <Avatar
                  source={{
                    uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
                  }}
                  label=""
                  size={26}
                  imageStyle={styles.avatar}
                />
                <Text style={styles.soldText}>0 Sold</Text>
                <Text style={styles.viewAllText}>View all</Text>
              </View>
            </View>
          </View>
          {/* Detail */}
          <View style={styles.detailContainer}>
            {RenderDetailItemData.map((i, indx) => (
              <View key={indx + 30} style={styles.detailItem}>
                <i.icon />
                <View style={styles.textContainer}>
                  {i?.title && (
                    <Text style={[styles.titleText, styles.titleTextSm]}>
                      {i.title}
                    </Text>
                  )}
                  <Text style={styles.offerText}>
                    {i.boldText}{' '}
                    <Text style={{color: Color.gray_200}}>{i.smallText}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.titleText}>About Event</Text>
            <Text style={[styles.offerText, {color: Color.gray_200}]}>
              {eventDetail?.about_event}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.titleText}>Tickets and Payment</Text>
          </View>
          {/*  */}
          <View
            style={[
              styles.detailContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View>
              <Text style={{color: Color.gray_200}}>Ticket Available</Text>
              <Text style={styles.offerText}>
                {' '}
                {(ticket ?? [])
                  .filter((i: any) => i?.type === 'ticket')
                  .map((i: any) => i?.total_ticket)
                  .filter((i: any) => i)
                  .reduce((p: any, n: any) => parseInt(p) + parseInt(n), 0)}
              </Text>
            </View>
            <View>
              <Text style={{color: Color.gray_200}}>Purchase Deadline</Text>
              <Text style={styles.offerText}>
                {moment(eventDetail?.last_booking_date).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
          {/*  */}
          {ticketLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              horizontal
              style={[
                styles.detailContainer,
                {
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                },
              ]}>
              {(ticket ?? [])
                .filter((i: any) => i?.type === 'ticket')
                .map((i: any, index: any) => {
                  return (
                    <>
                      <TicketType item={i} />
                      <Divider size={10} />
                    </>
                  );
                })}
            </ScrollView>
          )}

          {/*  */}
          <View style={styles.detailContainer}>
            <Text style={styles.titleText}>Table and Blueprint</Text>
          </View>
          <View
            style={[
              styles.detailContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View>
              <Text style={{color: Color.gray_200}}>
                Upload Tables Blueprint
              </Text>
              <Text style={styles.offerText}>{club?.club?.table_image}</Text>
            </View>
            <View>
              <Text style={{color: Color.gray_200}}>Ticket Available</Text>
              <Text style={styles.offerText}>
                {(ticket ?? [])
                  .filter((i: any) => i?.type === 'table')
                  .map((i: any) => i?.total_ticket)
                  .filter((i: any) => i)
                  .reduce((p: any, n: any) => parseInt(p) + parseInt(n), 0)}
              </Text>
            </View>
          </View>
          {/*  */}

          <ScrollView
            horizontal
            style={[
              styles.detailContainer,
              {
                flex: 1,
                flexDirection: 'row',
                width: '100%',
              },
            ]}>
            {(ticket ?? [])
              .filter((i: any) => i?.type === 'table')
              .map((i: any, index: any) => {
                return (
                  <>
                    <TicketType item={i} type={1} />
                    <Divider size={10} />
                  </>
                );
              })}
          </ScrollView>
          <View style={{height: 100}} />
        </>
      </PageContainer>
      <View style={[styles.detailContainer, styles.btnSaveAbs]}>
        <TouchableOpacity>
          <SHARE />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 15}}>
          <GradientButton text="Edit Event" style={styles.btnSave} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnSaveAbs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 99,
    bottom: 20,
    backgroundColor: Color.gray_100,
    paddingTop: 10,
  },
  btnSave: {
    width: undefined,
    minWidth: '100%',
  },
  offerText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
  },
  titleTextSm: {
    fontSize: FontSize.size_lg,
  },
  titleTextXs: {
    fontSize: FontSize.size_base,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  detailContainer: {
    padding: 12,
    paddingTop: 0,
    flexDirection: 'column',
  },
  viewAllText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.crimson,
    marginLeft: 8,
  },
  soldText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
    marginLeft: 8,
  },
  avatar: {
    borderWidth: 1,
    borderColor: Color.textWhiteFFFFFF,
  },
  avatarContianer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontSize: FontSize.size_xs,
    borderRadius: 10,
    borderWidth: 1,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 55,
    borderColor: Color.gray_200,
    overflow: 'hidden',
    color: Color.textWhiteFFFFFF,
    padding: 4,
  },
  tags: {
    flexDirection: 'row',
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_5xl,
    color: Color.textWhiteFFFFFF,
  },
  subTitle: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    color: Color.gray_200,
    marginTop: 5,
  },
  contentContainer: {
    padding: 12,
    marginTop: 10,
  },
  headerContainer: {
    height: 240,
  },
  sliderItem: {
    width: '100%',
  },
});

export default EventDetails;
