import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {FontSize, FontFamily, Color, MarginTop} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import {CALL, CLUB, GALLERY_EXPORT, INPUT_LOCATION} from '@assets/icons';
import AppInput, {GoogleAutoComplete, LabelTypo} from '@src/components/Input';
import MapView, {Marker} from 'react-native-maps';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {
  convertAddressComponents,
  createFormData,
  inputHelper,
  renderImage,
} from '@src/utils/helper';
import Pill from '@src/components/pill';
import * as ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import {uploadBanner, uploadTableBanner} from '@src/services/club.service';
import {createClubAsync, updateClubAsync} from '@src/feature/club/clubApi';
import {Button, RadioButton, RadioGroup} from 'react-native-ui-lib';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';
import ImageView from 'react-native-image-viewing';
import {clubCreateFormScheme} from '@src/form-schemas/club';

const CreateClub = () => {
  const [bannerImage, setBannerImage] = React.useState<any>(null);
  const [tableImage, setTableImage] = React.useState<any>(null);
  const [amenities, setAmenities] = React.useState<string[]>(['']);
  const [amenitiesText, setAmenitiesText] = React.useState<string>('');
  const [clubTypes, setClubTypes] = React.useState<string[]>(['']);
  const {replace, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const {params} = useRoute() as any;
  const {user, club} = useAppSelector(({clubSlice, authUser}) => ({
    ...clubSlice,
    ...authUser,
  })) as any;
  const {loading} = useAppSelector(({clubSlice}) => clubSlice) as any;
  const dispatch = useAppDispatch();
  const [visible, setIsVisible] = React.useState(false);
  const [mapViewData, setMapViewData] = React.useState<any>({});
  const googleAutoRef = React.useRef();

  React.useEffect(() => {
    if (params?.edit) {
      setAmenities((club?.club?.amenities ?? '').split(','));
      setClubTypes((club?.club?.types ?? '').split(','));
    }
  }, []);

  const onAddBanner = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      setBannerImage(res);
      // const imageRes = await uploadBanner(
      //   createFormData('banner', res?.assets?.[0], {}),
      // );
      // console.log(' === image res ===> ', imageRes);
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

  const onFormSubmit = async (values: any) => {
    const payload: any = {
      banner: '',
      table_image: '',
      name: values.name,
      types: values?.types,
      country_code: '91',
      mobile: values.mobile,
      location: mapViewData?.location,
      latitude: mapViewData?.lat,
      longitute: mapViewData?.lng,
      state: values.state,
      city: values.city,
      zipcode: values.zipcode,
      amenities: amenities.join(),
      description: values.description,
      ...(!params?.edit && {
        userId: user?.id,
      }),
      ...(params?.edit && {
        id: club?.club?.id,
      }),
    };
    if (!params?.edit) {
      dispatch(createClubAsync(payload)).then(res => {
        const status: any = res.meta.requestStatus;
        if (status === 'fulfilled') {
          replace('PrivateStack');
        }
      });
    } else {
      let banner = club?.club?.banner || '';
      let table = club?.club?.table_image || '';
      if (bannerImage?.assets) {
        const ext: any = (bannerImage?.assets?.[0]?.fileName ?? '')
          .split('.')
          .pop();
        banner = `${club?.club?.id}-banner.${ext}`;
        await uploadBanner(
          createFormData('banner', bannerImage?.assets?.[0], {}),
          club?.club?.id,
        );
      }
      if (tableImage?.assets) {
        const ext: any = (tableImage?.assets?.[0]?.fileName ?? '')
          .split('.')
          .pop();
        table = `${club?.club?.id}-table.${ext}`;
        await uploadTableBanner(
          createFormData('image', tableImage?.assets?.[0], {}),
          club?.club?.id,
        );
      }
      dispatch(
        updateClubAsync({
          ...payload,
          banner: banner,
          table_image: table,
        }),
      ).then(res => {
        const status: any = res.meta.requestStatus;
        if (status === 'fulfilled') {
          goBack();
        }
      });
    }
  };

  const onRemoveAmenities = (item: string) => {
    setAmenities(prev => prev.filter(i => i !== item));
  };

  const initValue = {
    tableBluerprint: '',
    name: '',
    types: 'bar',
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
    userId: user?.id,
    created: '',
    updated: '',
  };

  React.useEffect(() => {
    if (Boolean(params?.edit)) {
      setTimeout(() => {
        setMapViewData({
          lat: club?.club?.latitude,
          lng: club?.club?.longitute,
        });
      }, 1000);
    }
  }, [club]);

  return (
    <PageContainer loading={loading} useSafeArea={false}>
      <>
        <ImageView
          images={[
            {
              uri: renderImage(club?.club?.table_image),
            },
          ]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

        <View style={styles.header}>
          <Text style={styles.text}>
            {params?.edit ? 'Edit' : 'Create'} Your Club
          </Text>
          <Text style={styles.typeTheVerification}>
            Enter Details and {params?.edit ? 'edit' : 'create'} your club
          </Text>
        </View>

        {params?.edit && (
          <TouchableOpacity
            onPress={onAddBanner}
            style={styles.vuesaxoutlinegalleryExportParent}>
            <GALLERY_EXPORT />
            <Text style={[styles.typeTheVerification, {textAlign: 'center'}]}>
              Upload cove photo
            </Text>
            {(bannerImage || club?.club?.banner) && (
              <Image
                source={{
                  uri:
                    bannerImage?.assets?.[0].uri ||
                    renderImage(club?.club?.banner),
                }}
                style={{
                  width: '99.%',
                  height: 158,
                  position: 'absolute',
                  borderRadius: 10,
                }}
              />
            )}
          </TouchableOpacity>
        )}

        <Formik
          initialValues={
            !params?.edit
              ? initValue
              : {
                  tableBluerprint: '',
                  name: club?.club?.name,
                  types: club?.club?.types ?? '',
                  country_code: club?.club?.country_code,
                  mobile: club?.club?.mobile,
                  location: club?.club?.location,
                  latitude: club?.club?.latitude,
                  longitute: club?.club?.longitute,
                  state: club?.club?.state,
                  city: club?.club?.city,
                  zipcode: club?.club?.zipcode,
                  amenities: (club?.club?.amenities ?? '').split(','),
                  description: club?.club?.description,
                  userId: club?.club?.userId,
                }
          }
          validationSchema={clubCreateFormScheme}
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
              {console.log(' === error ===> ', errors)}
              <View style={styles.inputContianer}>
                {params?.edit && (
                  <AppInput
                    editable={false}
                    placeholder="click on upload"
                    label="Upload Tables Blueprint"
                    inputStyle={{
                      paddingLeft: 10,
                      paddingRight: 90,
                    }}
                    {...inputHelper(
                      'tableBluerprint',
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                    )}
                    value={
                      tableImage?.assets?.[0]?.fileName ||
                      club?.club?.table_image
                    }
                    extraItem={
                      <>
                        <TouchableOpacity
                          style={[
                            styles.addAmen,
                            styles.uploadImage,
                            {right: 80},
                          ]}
                          onPress={onAddTableImage}>
                          <Text style={styles.addAmenText}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setIsVisible(true)}
                          style={[
                            styles.addAmen,
                            styles.uploadImage,
                            {backgroundColor: Color.gray_300},
                          ]}>
                          <Text style={styles.addAmenText}>View</Text>
                        </TouchableOpacity>
                      </>
                    }
                  />
                )}

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
                <View
                  style={[
                    styles.inputContianer,
                    {
                      flex: 1,
                      width: '100%',
                      flexDirection: 'column',
                      marginTop: 0,
                    },
                  ]}>
                  <LabelTypo
                    label="Type"
                    textStyle={{
                      paddingLeft: 15,
                      width: '100%',
                    }}
                  />
                  <RadioGroup
                    style={styles.radioGroup}
                    initialValue={club?.club?.types ?? 'bar'}
                    onValueChange={(v: any) => {
                      console.log(' === radi value ==>', v);
                      setFieldValue('types', v);
                    }}>
                    <RadioButton
                      color={Color.crimson}
                      value={'bar'}
                      label={'Bar'}
                      labelStyle={{color: Color.textWhiteFFFFFF}}
                      size={21}
                    />
                    <View style={styles.divider} />
                    <RadioButton
                      color={Color.crimson}
                      value={'club'}
                      label={'Club'}
                      labelStyle={{color: Color.textWhiteFFFFFF}}
                      size={21}
                    />
                  </RadioGroup>
                </View>
                <View style={styles.divider} />
                <AppInput
                  IconSvg={<CALL />}
                  placeholder="331-623-8416"
                  label="Club Phone Number"
                  maxLength={10}
                  containerStyle={{
                    marginTop: -5,
                  }}
                  {...inputHelper(
                    'mobile',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />
                <View style={[styles.divider, {marginTop: 20}]} />
                <GoogleAutoComplete
                  ref={googleAutoRef}
                  IconSvg={<INPUT_LOCATION />}
                  placeholder="#123, Cal"
                  label="Location"
                  onChangeText={(_data: any, detail: any) => {
                    const data: any = convertAddressComponents(
                      detail?.address_components,
                    );
                    setMapViewData({
                      ...detail?.geometry?.location,
                      location: detail?.formatted_address,
                      state: data?.state,
                      country: data?.country,
                    });
                    setFieldValue('location', detail?.formatted_address, true);
                    setFieldValue('city', data?.city, true);
                    setFieldValue('state', data?.state, true);
                    setFieldValue('zipcode', data?.zip_code, true);
                  }}
                  {...(params?.edit && {
                    value: club?.club?.location,
                  })}
                  error={
                    errors.location || touched.location
                      ? errors.location
                      : undefined
                  }
                />
                <View style={styles.divider} />
                <View style={styles.pairContianer}>
                  {mapViewData?.lat && (
                    <MapView
                      style={{
                        flex: 1,
                        height: 200,
                        borderRadius: 10,
                        marginRight: 15,
                      }}
                      region={{
                        latitude: mapViewData?.lat,
                        longitude: mapViewData?.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      initialRegion={{
                        latitude: mapViewData?.lat,
                        longitude: mapViewData?.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      userInterfaceStyle="dark">
                      <Marker
                        coordinate={{
                          latitude: mapViewData?.lat,
                          longitude: mapViewData?.lng,
                        }}
                      />
                    </MapView>
                  )}
                </View>
                <View style={styles.divider} />
                <View style={styles.pairContianer}>
                  <View style={styles.pair}>
                    <AppInput
                      inputStyle={{width: 150}}
                      placeholder="State"
                      label="State"
                      editable={false}
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
                  <View style={styles.pair}>
                    <AppInput
                      inputStyle={{width: 150}}
                      placeholder="City"
                      label="City"
                      editable={false}
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
                  maxLength={6}
                  keyboardType="numeric"
                  {...inputHelper(
                    'zipcode',
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                  )}
                />

                <View style={[styles.divider, {marginTop: 20}]} />

                <AppInput
                  placeholder="type and add"
                  label="Amenities"
                  value={amenitiesText}
                  onChangeText={(text: any) => setAmenitiesText(text)}
                  extraItem={
                    <>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={[
                          styles.addedAmen,
                          {position: 'absolute', top: 10},
                        ]}>
                        {amenities.filter(i => i).length <= 0 && (
                          <Text style={styles.noAmmText}>No Amenties</Text>
                        )}
                        {amenities
                          .filter(i => i)
                          .map((i: string, index: any) => (
                            <Pill
                              key={index}
                              text={i}
                              onPress={onRemoveAmenities}
                            />
                          ))}
                      </ScrollView>
                      <Button
                        style={[
                          styles.addAmen,
                          {
                            top: 62,
                          },
                        ]}
                        onPress={() => {
                          setAmenities(
                            prev =>
                              [...(prev ?? []), amenitiesText] as string[],
                          );
                          setAmenitiesText('');
                        }}>
                        <Text style={styles.addAmenText}>Add</Text>
                      </Button>
                    </>
                  }
                  inputStyle={{
                    marginTop: 40,
                  }}
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
                  text={`${params?.edit ? 'Update' : 'Create'} Club`}
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
  noAmmText: {
    fontSize: FontSize.size_3xs,
    width: 335,
    textAlign: 'center',
    marginTop: 10,
    color: Color.dimgray,
    fontFamily: FontFamily.poppinsRegular,
  },
  radioGroup: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    paddingLeft: 15,
    marginTop: 5,
  },
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
