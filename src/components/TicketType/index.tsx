import {StyleSheet, Text, View} from 'react-native';
import {COUPLE} from '@assets/icons';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';

interface Props {
  type?: 0 | 1; // 0 default if you are passing 1 then it will be different design style
}

const TicketType = ({type = 0}: Props) => {
  if (type === 1) {
    return (
      <View style={[styles.container, {flex: 1 / 2, minHeight: 125}]}>
        <View style={styles.couple}>
          <COUPLE />
          <Text style={styles.offerText}>
            15
            <Text style={{color: Color.gray_200}}> Couple</Text>
          </Text>
        </View>
        <View style={styles.pillsContianer}>
          <Text style={styles.pillsItem}>Table Charge</Text>
          <Text style={styles.pillsItem}>Sofa</Text>
        </View>
        <Text style={styles.offerText}>After 9:30 PM</Text>
        <View style={styles.divider} />
        <Text style={styles.offerText}>Rs. 2000</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.couple}>
        <COUPLE />
        <Text style={styles.offerText}>
          15
          <Text style={{color: Color.gray_200}}> Couple</Text>
        </Text>
      </View>
      <Text style={{color: Color.gray_200}}> Guestlist</Text>
      <Text style={styles.offerText}>After 9:30 PM</Text>
      <View style={styles.divider} />
      <Text style={styles.offerText}>Rs. 2000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillsItem: {
    fontSize: FontSize.size_sm,
    color: Color.textWhiteFFFFFF,
    fontFamily: FontFamily.poppinsRegular,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.gray_200,
    padding: 4,
    height: 20,
    lineHeight: FontSize.size_sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    marginLeft: 0,
  },
  pillsContianer: {
    flexDirection: 'row',
  },
  price: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsSemibold,
  },
  divider: {
    height: 2,
    width: '100%',
    borderTopWidth: 2,
    borderColor: Color.gray_300,
  },
  offerText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
    marginLeft: 3,
  },
  titleTextSm: {
    fontSize: FontSize.size_lg,
  },
  couple: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    minWidth: 110,
    minHeight: 105,
    borderWidth: 1,
    borderColor: Color.gray_200,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'space-between',
    flex: 1 / 3,
  },
});

export default TicketType;
