import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {FontSize, FontFamily, Color, MarginTop} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import {CALL, CLUB, GALLERY_EXPORT, INPUT_LOCATION} from '@assets/icons';
import AppInput, {InputPicker} from '@src/components/Input';
import {clubCreateFormScheme} from '@src/form-schemas/club';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {createFormData, inputHelper, renderImage} from '@src/utils/helper';
import Pill from '@src/components/pill';
import * as ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import {uploadBanner, uploadTableBanner} from '@src/services/club.service';
import {createClubAsync, updateClubAsync} from '@src/feature/club/clubApi';
import {Button} from 'react-native-ui-lib';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/utils';
import ImageView from 'react-native-image-viewing';

const CreateClub = () => {
  const [bannerImage, setBannerImage] = React.useState<any>(null);
  const [tableImage, setTableImage] = React.useState<any>(null);
  const [amenities, setAmenities] = React.useState<string[]>(['']);
  const [amenitiesText, setAmenitiesText] = React.useState<string>('');
  const [clubTypes, setClubTypes] = React.useState<string[]>(['']);
  const {replace, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList>>();
  const {params} = useRoute() as any;
  const {loading, user, club} = useAppSelector(({clubSlice, authUser}) => ({
    ...clubSlice,
    ...authUser,
  })) as any;
  const dispatch = useAppDispatch();
  const [visible, setIsVisible] = React.useState(false);

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
    const data = new Date();

    const payload: any = {
      banner: '',
      table_image: '',
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
      created: data.getTime(),
      updated: data.getTime(),
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
    userId: user?.id,
    created: '',
    updated: '',
  };

  return (
    <PageContainer useSafeArea={false}>
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
                  types: (club?.club?.types ?? '').split(','),
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
                  created: club?.club?.created,
                  updated: new Date().getTime(),
                }
          }
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
                        {amenities.map((i: string, index: any) => (
                          <Pill
                            key={index}
                            text={i}
                            onPress={onRemoveAmenities}
                          />
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
                          // setFieldValue('amenities', amenities.join());
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
