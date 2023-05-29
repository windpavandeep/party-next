import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageContainer from '@components/Container';
import {LongEventCard} from '@components/EventCard';
import {Calendar} from 'react-native-calendars';
import {Color, FontFamily, FontSize} from '@utils/GlobalStyles';
import GradientButton from '@src/components/Button';
import {EVENTS} from '@src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@src/utils';
import {StackNavigationProp} from '@react-navigation/stack';

const Events = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const FloatActionButton = () => {
    return (
      <View style={styles.floatBtn}>
        <GradientButton
          icon={<EVENTS />}
          style={{width: 140}}
          text="Create Event"
          onPress={() => navigate('CreateEvent')}
        />
      </View>
    );
  };
  return (
    <>
      <PageContainer extraItems={<FloatActionButton />} useSafeArea={false}>
        <>
          <View style={styles.calContianer}>
            <Calendar
              style={styles.calendor}
              enableSwipeMonths
              current={'2022-07-06'}
              theme={{
                calendarBackground: Color.gray_300,
                dayTextColor: Color.textWhiteFFFFFF,
                textDisabledColor: Color.gray_200,
                textDayFontFamily: FontFamily.poppinsSemibold,
                monthTextColor: Color.textWhiteFFFFFF,
                arrowColor: Color.textWhiteFFFFFF,
                indicatorColor: 'blue',
              }}
            />
          </View>
          <View style={styles.listView}>
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <LongEventCard key={i} />
            ))} */}
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
                No events
              </Text>
            </View>
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
    bottom: 10,
    right: 10,
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

export default Events;
