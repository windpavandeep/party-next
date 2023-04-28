import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {TICKET_BG_SVG} from '@assets/icons';
import {QRCODE} from '@assets/images';
import {Color, FontFamily, FontSize} from 'src/utils/GlobalStyles';
import {TicketEventCard} from '@components/EventCard';
import GradientButton from '../Button';

const ListItemComponent = () => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemDetail}>
        <Text>2 Couple</Text>
        <Text style={styles.typeText}>Guestlist</Text>
      </View>
      <View style={styles.listItemPriceDetail}>
        <Text style={styles.freeText}>Free</Text>
        <Text style={styles.timeText}>Before 9:30 PM</Text>
      </View>
    </View>
  );
};

const Ticket = () => {
  const {height} = useWindowDimensions();
  const H = 180;
  return (
    <View style={[styles.container, {height: height - H}]}>
      <View style={styles.bgContainer}>
        <TICKET_BG_SVG height={height - H} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.ticketHeader}>
          <Image source={QRCODE} style={{height: 80, width: 80}} />
          <Text style={styles.bookingIdText}>Booking ID</Text>
          <Text style={styles.bookingIdValue}>WWF9SJ89</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ticketDetailContainer}>
          <TicketEventCard />
          <View>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <ListItemComponent key={i} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.btnContianer}>
          <GradientButton style={styles.btnStyle} />
          <Text
            style={[
              styles.typeText,
              {
                marginTop: 10,
              },
            ]}>
            Terms & Condition <Text style={{color: Color.crimson}}>view</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
  },
  btnContianer: {
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
  },
  freeText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'right',
    color: Color.crimson,
  },
  timeText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'right',
    color: Color.text_black,
  },
  typeText: {
    fontSize: FontSize.size_3xs,
    color: Color.text_gray,
    fontFamily: FontFamily.poppinsRegular,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 55,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    padding: 5,
    borderColor: '#E6EFFB',
  },
  listItemDetail: {
    height: '90%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  listItemPriceDetail: {
    height: '90%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  ticketDetailContainer: {
    padding: 8,
    flexDirection: 'column',
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  bookingIdValue: {
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_lg,
    color: Color.text_black,
  },
  bookingIdText: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_3xs,
    color: Color.text_gray,
    marginTop: 20,
  },
  ticketHeader: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: 280,
  },
  bgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Ticket;
