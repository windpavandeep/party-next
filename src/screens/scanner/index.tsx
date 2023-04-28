import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TICKET_BG_PNG} from '@assets/images';
import Ticket from '@components/Ticket';

const Scanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        <Image style={{flex: 1, width: '100%'}} source={TICKET_BG_PNG} />
      </View>
      <Ticket />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  bgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Scanner;
