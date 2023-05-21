import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {FontSize, FontFamily, Color, MarginTop} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import {CALL, CLUB, GALLERY_EXPORT, INPUT_LOCATION} from '@assets/icons';
import AppInput, {InputPicker} from '@src/components/Input';
import {clubCreateFormScheme} from '@src/form-schemas/club';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {createFormData, inputHelper} from '@src/utils/helper';
import Pill from '@src/components/pill';
import * as ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import {uploadBanner} from '@src/services/club.service';
import {createClubAsync} from '@src/feature/club/clubApi';
import {Button} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';

const CreateClub = () => {
  const [bannerImage, setBannerImage] = React.useState<any>(null);
  const [tableImage, setTableImage] = React.useState<any>(null);
  const [amenities, setAmenities] = React.useState<string[]>(['abc']);
  const [amenitiesText, setAmenitiesText] = React.useState<string>('');
  const [clubTypes, setClubTypes] = React.useState<string[]>(['']);
  const {replace} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {loading, user} = useAppSelector(({clubSlice, authUser}) => ({
    ...clubSlice,
    ...authUser,
  })) as any;
  const dispatch = useAppDispatch();

  const onAddBanner = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      setBannerImage(res);
      const imageRes = await uploadBanner(
        createFormData('banner', res?.assets?.[0], {}),
      );
      console.log(' === image res ===> ', imageRes);
    } catch (error: any) {
      console.log(' == error ===> ', error, error?.response);
    }
  };

  const onAddTableImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      setTableImage(res);
    } catch (error) {
      console.log(' == error ===> ', error);
    }
  };

  const onFormSubmit = (values: any) => {
    const data = new Date();
    const payload: any = {
      banner: values.banner,
      name: values.name,
      types: clubTypes.join(),
      country_code: '91',
      mobile: values.mobile,
      location: values.location,
      latitude: '123.213123',
      longitute: '12.321321',
      state: values.state,
      city: values.city,
      zipcode: values.zipcode,
      amenities: amenities.join(),
      description: values.description,
      userId: user?.id,
      created: data.getTime(),
      updated: data.getTime(),
    };
    dispatch(createClubAsync(payload)).then(res => {
      const status: any = res.meta.requestStatus;
      if (status === 'fulfilled') {
        replace('PrivateStack');
      }
    });
  };

  const onRemoveAmenities = (item: string) => {
    setAmenities(prev => prev.filter(i => i !== item));
  };

  return (
    <PageContainer useSafeArea={false}>
      <>
        <View style={styles.header}>
          <Text style={styles.text}>Create Your Club</Text>
          <Text style={styles.typeTheVerification}>
            Enter Details and create your club
          </Text>
        </View>

        <TouchableOpacity
          onPress={onAddBanner}
          style={styles.vuesaxoutlinegalleryExportParent}>
          <GALLERY_EXPORT />
          <Text style={[styles.typeTheVerification, {textAlign: 'center'}]}>
            Upload cove photo
          </Text>
          {bannerImage && (
            <Image
              source={{uri: bannerImage?.assets?.[0].uri}}
              style={{
                width: '99.%',
                height: 158,
                position: 'absolute',
                borderRadius: 10,
              }}
            />
          )}
        </TouchableOpacity>

        <Formik
          initialValues={{
            tableBluerprint: '',
            name: '',
            types: '',
            country_code: '',
            mobile: '',
            location: '',
            latitude: '',
            longitute: '',
            state: '',
            city: '',
            zipcode: '',
            amenities: '',
            description: '',
            userId: 1,
            created: '',
            updated: '',
          }}
          // validationSchema={}
          onSubmit={onFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <View style={styles.inputContianer}>
                <AppInput
                  placeholder="click on upload"
                  label="Upload Tables Blueprint"
                  inputStyle={{
                    paddingLeft: 10,
                  }}
                  {...inputHelper(
                    'tableBluerprint',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                  value={tableImage?.assets?.[0]?.fileName}
                  extraItem={
                    <>
                      <TouchableOpacity
                        style={[styles.addAmen, styles.uploadImage]}
                        onPress={onAddTableImage}>
                        <Text style={styles.addAmenText}>Upload</Text>
                      </TouchableOpacity>
                    </>
                  }
                />
                <View style={styles.divider} />
                <AppInput
                  IconSvg={<CLUB />}
                  placeholder="Club Name"
                  label="Club Name"
                  {...inputHelper(
                    'name',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
                <View style={styles.divider} />
                <InputPicker
                  label="Type"
                  placeholder="Club Name"
                  mode="MULTI"
                  onChangeText={(res: any) => setClubTypes(res)}
                  value={clubTypes}
                />
                <View style={styles.divider} />
                <AppInput
                  IconSvg={<CALL />}
                  placeholder="331-623-8416"
                  label="Club Phone Number"
                  {...inputHelper(
                    'mobile',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
                <View style={styles.divider} />
                <AppInput
                  IconSvg={<INPUT_LOCATION />}
                  placeholder="#123, Cal"
                  label="Location"
                  {...inputHelper(
                    'location',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
                <View style={styles.divider} />
                <View style={styles.pairContianer}>
                  <View style={styles.pair}>
                    <AppInput
                      inputStyle={{width: 155}}
                      placeholder="State"
                      label="State"
                      {...inputHelper(
                        'state',
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                      )}
                    />
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.pair}>
                    <AppInput
                      inputStyle={{width: 150}}
                      placeholder="City"
                      label="City"
                      {...inputHelper(
                        'city',
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                      )}
                    />
                  </View>
                </View>
                <View style={styles.divider} />
                <AppInput
                  placeholder="Enter Zip Code"
                  label="Zip Code"
                  {...inputHelper(
                    'zipcode',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
                <View style={styles.divider} />

                <AppInput
                  placeholder="type and add"
                  label="Amenities"
                  value={amenitiesText}
                  onChangeText={(text: any) => setAmenitiesText(text)}
                  extraItem={
                    <>
                      <View style={styles.addedAmen}>
                        {amenities.map((i: string) => (
                          <Pill text={i} onPress={onRemoveAmenities} />
                        ))}
                      </View>
                      <Button
                        style={styles.addAmen}
                        onPress={() => {
                          setAmenities(
                            prev =>
                              [...(prev ?? []), amenitiesText] as string[],
                          );
                          setAmenitiesText('');
                          setFieldValue('amenities', amenities.join());
                        }}>
                        <Text style={styles.addAmenText}>Add</Text>
                      </Button>
                    </>
                  }
                />
                <View style={styles.divider} />
                <AppInput
                  placeholder="Type Something"
                  label="Description"
                  multiline={true}
                  numberOfLines={100}
                  inputStyle={{
                    height: 150,
                    paddingTop: 10,
                  }}
                  {...inputHelper(
                    'description',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
              </View>

              <View style={styles.buttonContianer}>
                <GradientButton
                  text="Create Club"
                  loading={!!loading}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  uploadImage: {
    top: 32,
    width: 70,
  },
  addedAmen: {
    flexDirection: 'row',
    marginTop: 8,
    height: 30,
  },
  addAmen: {
    width: 50,
    height: 38,
    position: 'absolute',
    right: 6,
    top: 69,
    borderRadius: 8,
    backgroundColor: Color.crimson,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  addAmenText: {
    color: Color.textWhiteFFFFFF,
  },
  pair: {
    flex: 1,
  },
  pairContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
  },
  inputContianer: {
    marginTop: 22,
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    marginTop: 20,
    width: 20,
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
    overflow: 'hidden',
    zIndex: 99,
  },
  buttonContianer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
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
