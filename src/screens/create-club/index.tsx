import * as React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  MarginTop,
} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import {CALL, CLUB, GALLERY_EXPORT} from '@assets/icons';
import AppInput, {InputPicker} from 'src/components/Input';
import {Picker} from 'react-native-ui-lib';

const CreateClub = () => {
  return (
    <PageContainer>
      <>
        <View style={styles.header}>
          <Text style={styles.text}>Create Your Club</Text>
          <Text style={styles.typeTheVerification}>
            Enter Details and create your club
          </Text>
        </View>

        <View style={styles.vuesaxoutlinegalleryExportParent}>
          <GALLERY_EXPORT />
          <Text style={[styles.typeTheVerification, {textAlign: 'center'}]}>
            Upload cove photo
          </Text>
        </View>

        <View style={styles.inputContianer}>
          <AppInput
            placeholder="image12323.jpeg"
            label="Upload Tables Blueprint"
            inputStyle={{
              paddingLeft: 10,
            }}
          />
          <View style={styles.divider} />
          <AppInput
            IconSvg={<CLUB />}
            placeholder="Club Name"
            label="Club Name"
          />
          <View style={styles.divider} />
          <InputPicker IconSvg={<CLUB />} placeholder="Club Name" label="" />
          <View style={styles.divider} />
          <AppInput
            IconSvg={<CALL />}
            placeholder="331-623-8416"
            label="Club Phone Number"
          />
        </View>

        <View style={styles.buttonContianer}>
          <GradientButton text="Create Club" />
        </View>
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  inputContianer: {
    marginTop: 22,
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    marginTop: 20,
  },
  vuesaxoutlinegalleryExportParent: {
    height: 160,
    backgroundColor: Color.gray_300,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Color.textWhiteFFFFFF,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContianer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 84,
    height: 67,
    width: 295,
  },
  text: {
    fontSize: FontSize.size_5xl,
    fontWeight: '600',
    fontFamily: FontFamily.poppinsSemibold,
    textAlign: 'left',
    width: 295,
    color: Color.textWhiteFFFFFF,
  },
  typeTheVerification: {
    color: Color.gray_200,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    width: 295,
    fontSize: FontSize.size_sm,
    marginTop: MarginTop.m_gtext,
  },
});

export default CreateClub;
