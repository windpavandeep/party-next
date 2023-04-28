import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PageContainer from '@components/Container';
import {Avatar, Carousel} from 'react-native-ui-lib';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import {useMemo} from 'react';
import {CALENDOR, OFFER_CODE, ROUNDER_LOCATION, SHARE} from '@assets/icons';
import TicketType from '@components/TicketType';
import Divider from '@components/Divider';
import GradientButton from '@components/Button';

const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

const RenderDetailItemData = [
  {
    icon: OFFER_CODE,
    title: '20% OFF',
    boldText: 'Use Code:',
    smallText: 'HAPPYFRIDAY',
  },
  {
    icon: CALENDOR,
    title: 'March 16, 2023',
    boldText: 'Thursday, ',
    smallText: '09:00 PM - 02:00 AM',
  },
  {
    icon: ROUNDER_LOCATION,
    title: undefined,
    boldText: undefined,
    smallText:
      '7/2-4, Siddhi Garden, Near Mhatre Bridge, Erandwane, Pune, Maharashtra 411004',
  },
];

const EventDetails = () => {
  const CarouselRender = useMemo(
    () => (
      <Carousel loop>
        {IMAGES.map((i, index) => (
          <View key={index} style={styles.sliderItem}>
            <Image
              key={index}
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
    [],
  );

  return (
    <>
      <PageContainer useSafeArea={false} disablePadding>
        <>
          <View style={[styles.headerContainer]}>{CarouselRender}</View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Holi Celebration</Text>
            <Text style={styles.subTitle}>Playboy Club</Text>
            <View style={styles.tagsContainer}>
              <View style={styles.tags}>
                <Text style={styles.tagText}>Music</Text>
                <Text style={[styles.tagText, {marginLeft: 5}]}>Night</Text>
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
                <Text style={styles.soldText}>220 Sold</Text>
                <Text style={styles.viewAllText}>View all</Text>
              </View>
            </View>
          </View>
          {/* Detail */}
          <View style={styles.detailContainer}>
            {RenderDetailItemData.map((i, indx) => (
              <View key={indx} style={styles.detailItem}>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially.
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
              <Text style={styles.offerText}>97</Text>
            </View>
            <View>
              <Text style={{color: Color.gray_200}}>Purchase Deadline</Text>
              <Text style={styles.offerText}>20-03-2023</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={[
              styles.detailContainer,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <TicketType />
            <Divider size={10} />
            <TicketType />
            <Divider size={10} />
            <TicketType />
          </View>
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
              <Text style={styles.offerText}>image12323.jpeg</Text>
            </View>
            <View>
              <Text style={{color: Color.gray_200}}>Ticket Available</Text>
              <Text style={styles.offerText}>97</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={[
              styles.detailContainer,
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <TicketType type={1} />
            <Divider size={10} />
            <TicketType type={1} />
          </View>
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
