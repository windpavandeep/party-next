import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '@utils/GlobalStyles';

const PADDING = 12;

interface Props {
  children: JSX.Element;
  useSafeArea?: boolean;
  disablePadding?: boolean;
}

const PageContainer = ({
  children,
  disablePadding = false,
  useSafeArea = true,
}: Props) => {
  const Element = useSafeArea ? SafeAreaView : View;
  return (
    <Element
      style={[
        styles.container,
        {
          padding: disablePadding ? 0 : PADDING,
        },
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        {children}
      </ScrollView>
    </Element>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flexGrow: 1,
    paddingBottom: 50,
    position: 'relative',
  },
  container: {
    backgroundColor: Color.gray_100,
    flex: 1,
    padding: PADDING,
  },
});

export default PageContainer;
