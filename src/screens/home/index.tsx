import * as React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {FontSize, FontFamily, Color, Border} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import {ARROW_RIGHT, DANGER, LOCATION} from '@assets/icons';
import EventCard, {LongEventCard} from '@components/EventCard';

const Home = () => {
  return (
    <>
      <PageContainer useSafeArea={false}>
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
            {[1, 2].map(i => (
              <LongEventCard key={i} />
            ))}
          </View>

          <View style={styles.tabContainer}>
            <Text style={[styles.tab]}>Upcoming Events</Text>
            <Text style={styles.tab1}>
              See all <ARROW_RIGHT />
            </Text>
          </View>
          <View style={styles.cardEventItemContainer}>
            <ScrollView horizontal>
              {[1, 2, 3, 4, 5].map(i => (
                <React.Fragment key={i}>
                  <EventCard />
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