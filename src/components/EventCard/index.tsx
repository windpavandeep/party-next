import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Image} from 'react-native-ui-lib';
import {Color, FontFamily} from '@utils/GlobalStyles';
import {LOCATION} from '@assets/icons';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@utils/index';

const EventCard = () => {
  const [randNum] = useState(Math.floor(Math.random() * 10) + 1);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://picsum.photos/id/${randNum}/200/300`,
        }}
        width={193}
        height={120}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.gridItemText}>Holi Night</Text>
        <View style={styles.typeContainer}>
          <Text style={styles.typpeText}>Music</Text>
          <View style={styles.avatarContainer}>
            {[1, 2, 4].map((i, index) => (
              <Avatar
                key={i}
                source={{
                  uri: 'https://source.unsplash.com/random/200x200?sig=' + i,
                }}
                size={24}
                containerStyle={[
                  styles.avatarItem,
                  {
                    marginLeft: index * 12,
                  },
                ]}
              />
            ))}
            <Text style={styles.totalSoldText}>220 Sold</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <LOCATION />
          <Text style={styles.locationText}>Orilla, Pune</Text>
        </View>
        <Text style={styles.dateText}>20 Dec, 9:00pm</Text>
      </View>
    </View>
  );
};

export const LongEventCard = () => {
  const [randNum] = useState(Math.floor(Math.random() * 10) + 1);
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigate('EventDetails')}
      style={styles.itemContainer}>
      <Image
        source={{
          uri: `https://picsum.photos/id/${randNum}/200/300`,
        }}
        width={100}
        height={117}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.gridItemText}>Holi Night</Text>
        <View style={styles.typeContainer}>
          <Text style={styles.typpeText}>Music</Text>
          <View style={styles.avatarContainer}>
            {[1, 2, 4].map((i, index) => (
              <Avatar
                key={i}
                source={{
                  uri: 'https://source.unsplash.com/random/200x200?sig=' + i,
                }}
                size={24}
                containerStyle={[
                  styles.avatarItem,
                  {
                    marginLeft: index * 12,
                  },
                ]}
              />
            ))}
            <Text style={styles.totalSoldText}>220 Sold</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <LOCATION />
          <Text style={styles.locationText}>Orilla, Pune</Text>
        </View>
        <Text style={styles.dateText}>20 Dec, 9:00pm</Text>
      </View>
    </TouchableOpacity>
  );
};

export const TicketEventCard = () => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, styles.itemContainerTicket]}>
      <Image
        source={{
          uri: 'https://picsum.photos/seed/picsum/200/300',
        }}
        width={90}
        height={70}
        style={{borderRadius: 10}}
      />
      <View style={[styles.detailContainer, styles.detailContainerTicket]}>
        <Text style={[styles.gridItemText, styles.gridItemTextTicket]}>
          Holi Night
        </Text>
        <View style={[styles.locationContainer, {marginTop: 3}]}>
          <LOCATION />
          <Text style={styles.locationText}>Orilla, Pune</Text>
        </View>
        <Text style={[styles.dateTextTicket]}>20 Dec, 9:00pm</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainerTicket: {
    borderWidth: 0,
    height: 70,
  },
  itemContainer: {
    height: 115,
    width: '100%',
    borderRadius: 12,
    backgroundColor: Color.gray_300,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Color.dimgray,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  dateTextTicket: {
    borderWidth: 0.5,
    borderColor: Color.text_gray,
    color: Color.text_gray,
    padding: 3,
    width: 90,
    fontSize: 10,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.textWhiteFFFFFF,
    borderWidth: 0.5,
    borderColor: Color.textWhiteFFFFFF,
    width: 100,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: Color.gray_300,
  },
  locationText: {
    marginLeft: 4,
    color: Color.crimson,
    fontSize: 12,
    fontFamily: FontFamily.poppinsRegular,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalSoldText: {
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 58,
    color: Color.textWhiteFFFFFF,
    fontSize: 10,
  },
  avatarItem: {
    position: 'absolute',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  typpeText: {
    borderWidth: 1,
    borderColor: Color.crimson,
    padding: 6,
    textAlign: 'center',
    color: Color.crimson,
    borderRadius: 14,
    fontSize: 10,
    width: 55,
  },
  typeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  gridItemTextTicket: {
    color: Color.text_black,
  },
  gridItemText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.textWhiteFFFFFF,
  },
  detailContainerTicket: {
    padding: 0,
    paddingLeft: 10,
    justifyContent: 'flex-start',
  },
  detailContainer: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  container: {
    width: 192,
    height: 230,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Color.gray_300,
    borderWidth: 1,
    borderColor: Color.dimgray,
  },
});

export default EventCard;
