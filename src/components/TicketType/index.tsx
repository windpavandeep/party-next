import {StyleSheet, Text, View} from 'react-native';
import {
  COUPLE,
  COUPLE_ICON_LIGHT,
  FEMALE_LIGHT,
  MALE_LIGHT,
} from '@assets/icons';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import moment from 'moment';

interface Props {
  type?: 0 | 1; // 0 default if you are passing 1 then it will be different design style
  item?: any;
}

const TicketType = ({type = 0, item}: Props) => {
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
          <Text style={styles.pillsItem}>{item?.visit_type}</Text>
          <Text style={styles.pillsItem}>{item?.table_type}</Text>
        </View>
        <Text style={styles.offerText}>{item?.beforeafter}</Text>
        <View style={styles.divider} />
        <Text style={styles.offerText}>Rs. {item?.price}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.couple}>
        {item?.ticket_type === 'couple' && <COUPLE_ICON_LIGHT />}
        {item?.ticket_type === 'male' && <MALE_LIGHT />}
        {item?.ticket_type === 'female' && <FEMALE_LIGHT />}
        <Text style={styles.offerText}>
          {item?.total_ticket}
          <Text style={{color: Color.gray_200}}> {item?.name}</Text>
        </Text>
      </View>
      <Text style={{color: Color.gray_200}}> {item?.visit_type}</Text>
      <Text style={styles.offerText}>
        {item?.beforeafter}{' '}
        {moment(parseInt(item?.ticket_time)).format('HH:MM A')}
      </Text>
      <View style={styles.divider} />
      <Text style={styles.offerText}>Rs. {item?.price}</Text>
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
