import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color} from '@utils/GlobalStyles';

interface Props {
  children: JSX.Element;
}

const PageContainer = ({children}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.gray_100,
    flex: 1,
    width: '100%',
    height: 812,
    overflow: 'hidden',
    padding: 20,
  },
});

export default PageContainer;
