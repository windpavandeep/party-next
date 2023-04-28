import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PageContainer from '@components/Container';
import {LongEventCard} from '@components/EventCard';
import {Calendar} from 'react-native-calendars';
import {Color, FontFamily} from '@utils/GlobalStyles';

const Events = () => {
  return (
    <>
      <PageContainer useSafeArea={false}>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <LongEventCard key={i} />
            ))}
          </View>
        </>
      </PageContainer>
    </>
  );
};

const styles = StyleSheet.create({
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
