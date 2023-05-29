import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Border, Color, FontSize} from '@utils/GlobalStyles';
import {FontFamily} from '@utils/GlobalStyles';
import GradientButton from '../Button';
import {
  ARROW_DOWN,
  COUPLE_ICON,
  FEMALE_ICON,
  MALE_ICON,
} from '@src/assets/icons';
import AppInput from '../Input';
import {
  DateTimePicker,
  Picker,
  RadioButton,
  RadioGroup,
  Switch,
} from 'react-native-ui-lib';
import {InputPicker} from '../Input';

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

const AddTicket = ({show, onClose, onConfirm}: Props) => {
  const [buttonType, setButtonType] = useState<string>('couple');
  const [formData, setFormData] = useState<object>() as any;
  const setButtonTypeHandler = (type: string) => {
    setButtonType(type);
  };

  const onFormDataSet = (key: string, value: string | any) => {
    setFormData((p: any) => ({
      ...p,
      [key]: value,
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onClose();
      }}>
      <View style={[styles.centeredView]}>
        <View style={[styles.modalView, styleAddTicket.modalView]}>
          <Text
            style={[
              styles.title,
              {
                textAlign: 'left',
                width: '100%',
              },
            ]}>
            Add Ticket
          </Text>
          <View style={styleAddTicket.typeSelect}>
            <TouchableOpacity
              onPress={() => {
                onFormDataSet('ticketType', 'couple');
                setButtonTypeHandler('couple');
              }}
              style={[
                styleAddTicket.buttonType,
                {
                  ...(buttonType === 'couple' && {
                    borderColor: Color.crimson,
                  }),
                },
              ]}>
              <COUPLE_ICON />
              <Text style={styleAddTicket.textButton}>Couple</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onFormDataSet('ticketType', 'male');
                setButtonTypeHandler('male');
              }}
              style={[
                styleAddTicket.buttonType,
                {
                  ...(buttonType === 'male' && {
                    borderColor: Color.crimson,
                  }),
                },
              ]}>
              <MALE_ICON />
              <Text style={styleAddTicket.textButton}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onFormDataSet('ticketType', 'female');
                setButtonTypeHandler('female');
              }}
              style={[
                styleAddTicket.buttonType,
                {
                  ...(buttonType === 'female' && {
                    borderColor: Color.crimson,
                  }),
                },
              ]}>
              <FEMALE_ICON />
              <Text style={styleAddTicket.textButton}>Female</Text>
            </TouchableOpacity>
          </View>
          <View style={styleAddTicket.inputContainer}>
            <AppInput
              inputStyle={styleAddTicket.inputStyle}
              placeholder="Early Bird"
              placeholderColor={Color.text_black}
              label=" "
              onChangeText={(v: any) => onFormDataSet('name', v)}
            />
          </View>
          <RadioGroup
            style={styles.radioGroup}
            initialValue={'Guestlist'}
            onValueChange={(v: any) => onFormDataSet('list', v)}>
            <RadioButton
              color={Color.crimson}
              value={'guestlist'}
              label={'Guestlist'}
              labelStyle={{color: Color.gray_100}}
              size={18}
            />
            <View style={styles.divider} />
            <RadioButton
              color={Color.crimson}
              value={'fullcover'}
              label={'Full Cover'}
              labelStyle={{color: Color.gray_100}}
              size={18}
            />
            <View style={styles.divider} />
            <RadioButton
              color={Color.crimson}
              value={'nocover'}
              label={'No Cover'}
              labelStyle={{color: Color.gray_100}}
              size={18}
            />
          </RadioGroup>
          <View style={styleAddTicket.inputContainer}>
            <View style={styleAddTicket.pickerContainer}>
              <View style={styleAddTicket.inputItemContainer}>
                <Picker
                  value={'before'}
                  placeholder={'type'}
                  onChange={(v: any) => onFormDataSet('beforeAfetr', v)}>
                  <Picker.Item key={0} value={'before'} label={'Before'} />
                  <Picker.Item key={1} value={'after'} label={'After'} />
                </Picker>
              </View>
              <View style={styles.divider} />
              <View
                style={[
                  styleAddTicket.inputItemContainer,
                  {marginTop: 10, paddingTop: 0},
                ]}>
                <DateTimePicker
                  title={undefined}
                  placeholder={'Time'}
                  mode={'time'}
                  style={styleAddTicket.timePickerStyle}
                  onChange={(date: Date) =>
                    onFormDataSet('time', date.getTime())
                  }
                />
              </View>
              <View style={styles.divider} />
              <View
                style={[
                  styleAddTicket.inputItemContainer,
                  styleAddTicket.switchContainer,
                ]}>
                <Text style={styleAddTicket.textonOff}>On/Off</Text>
                <Switch
                  value={formData?.timeonoff}
                  onValueChange={(e: any) => onFormDataSet('timeonoff', e)}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styleAddTicket.inputContainer,
              {
                flexDirection: 'row',
              },
            ]}>
            <AppInput
              inputStyle={styleAddTicket.inputStyle}
              placeholder="Total Tickets"
              placeholderColor={Color.text_black}
              onChangeText={(v: any) => onFormDataSet('total_tickets', v)}
            />
            <View style={styles.divider} />
            <AppInput
              inputStyle={styleAddTicket.inputStyle}
              placeholder="Price"
              placeholderColor={Color.text_black}
              onChangeText={(v: any) => onFormDataSet('price', v)}
            />
          </View>
          <View
            style={[
              styleAddTicket.inputContainer,
              {
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <GradientButton
              style={{width: '100%'}}
              text={`Add`}
              onPress={() => onConfirm(formData)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styleAddTicket = StyleSheet.create({
  switchContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  textonOff: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.poppinsRegular,
    marginRight: 10,
    marginLeft: -20,
  },
  timePickerStyle: {
    height: 40,
  },
  inputItemContainer: {
    marginTop: 10,
    backgroundColor: Color.gray_300,
    borderStyle: 'solid',
    borderColor: '#4e4e4e',
    borderWidth: 1,
    borderRadius: Border.br_3xs,
    color: Color.textWhiteFFFFFF,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 18,
    paddingLeft: 10,
  },
  pickerContainer: {
    flex: 1 / 3,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '100%',
    color: Color.gray_100,
  },
  inputContainer: {
    flex: 1 / 4,
    width: '100%',
  },
  modalView: {
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 400,
    flex: 1 / 4,
  },
  centeredView: {
    flex: 1,
  },
  typeSelect: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonType: {
    width: 94,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.text_gray,
    borderRadius: 8,
  },
  textButton: {
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 5,
  },
});

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 20,
    width: 20,
  },
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

export {AddTicket};

export default ModalAlert;
