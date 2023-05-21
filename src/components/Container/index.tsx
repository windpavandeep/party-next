import React, {Fragment} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '@utils/GlobalStyles';
import {LoaderScreen} from 'react-native-ui-lib';

const PADDING = 12;

interface Props {
  children: JSX.Element;
  useSafeArea?: boolean;
  disablePadding?: boolean;
  loading?: boolean;
  extraItems?: JSX.Element | any;
}

const PageContainer = ({
  children,
  disablePadding = false,
  useSafeArea = true,
  loading = false,
  extraItems,
}: Props) => {
  const Element = useSafeArea ? SafeAreaView : View;
  const LoaderElement: any = loading ? LoaderScreen : Fragment;
  return (
    <>
      <Element
        style={[
          styles.container,
          {
            padding: disablePadding ? 0 : PADDING,
          },
        ]}>
        <LoaderElement
          {...(loading && {
            customLoader: (
              <ActivityIndicator size={'large'} color={Color.crimson} />
            ),
            message: 'Loading...',
          })}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollView}>
            {children}
          </ScrollView>
        </LoaderElement>
        {extraItems && extraItems}
      </Element>
    </>
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
