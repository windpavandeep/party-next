import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color, FontSize} from '@utils/GlobalStyles';
import {FontFamily} from '@utils/GlobalStyles';
import GradientButton from '../Button';

interface Props {
  show: boolean;
  onClose?: any;
  title?: string;
  subTitle?: string;
  onConfirm?: any;
  btnText?: string;
}

const ModalAlert = ({
  show,
  onClose,
  onConfirm,
  title,
  subTitle,
  btnText,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <GradientButton
            onPress={onConfirm}
            text={btnText}
            style={{width: '90%'}}
          />
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{top: 10, bottom: 10, left: 30, right: 30}}>
            <Text style={styles.notNow}>Not Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  notNow: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
  },
  title: {
    fontSize: FontSize.size_5xl,
    color: Color.text_black,
    fontFamily: FontFamily.poppinsSemibold,
  },
  subTitle: {
    fontSize: FontSize.size_sm,
    color: Color.text_gray,
    fontFamily: FontFamily.poppinsRegular,
    width: '70%',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: Color.textWhiteFFFFFF,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    minHeight: 250,
  },
});

export default ModalAlert;
