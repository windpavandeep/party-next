import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {FontSize, FontFamily, Color, MarginTop} from '@utils/GlobalStyles';
import PageContainer from '@components/Container';
import GradientButton from '@components/Button';
import {GALLERY_EXPORT, INPUT_LOCATION, PLUS_ADD} from '@assets/icons';
import AppInput, {
  InputDatePicker,
  InputPicker,
  InputTimePicker,
  LabelTypo,
} from '@src/components/Input';
import {inputHelper} from '@src/utils/helper';
import Pill from '@src/components/pill';
import {Formik} from 'formik';
import {Button, RadioButton, RadioGroup} from 'react-native-ui-lib';
import {AddTicket} from '@src/components/Modal';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {
  createEventAsync,
  createTicketAsync,
} from '@src/feature/events/eventApi';
import * as ImagePicker from 'react-native-image-picker';

const CreateEvent = () => {
  const [bannerImage, setBannerImage] = React.useState<any>(null);
  const [gallary, setGallary] = React.useState<any>(null);
  const [showAddTicket, setShowAddTicket] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [amenities, setAmenities] = React.useState<string[]>(['']);
  const [amenitiesText, setAmenitiesText] = React.useState<string>('');
  const [newTicket, setNewTicket] = React.useState<object[]>([]);
  const [formData, setFormData] = React.useState<object>({}) as any;
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const {loading, event} = useAppSelector(({eventSlice}) => eventSlice) as any;
  const {width} = useWindowDimensions();

  const onChangeInputValue = (key: any, value: any) => {
    setFormData((p: any) => ({
      ...p,
      [key]: value,
    }));
  };

  const onHandlerClick = () => {
    const payload = {
      ...formData,
      event_type: (formData?.event_type ?? []).join(),
      userId: user?.id,
    };

    dispatch(createEventAsync(payload)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setStep(p => p + 1);
      }
    });
    // setTimeout(() => {
    //   console.error('Server not responding');
    //   console.error('Databse memory out of bounds');
    //   devToolsEnhancer();
    // }, 2000);
  };

  const addTicket = (res: any) => {
    dispatch(createTicketAsync(newTicket)).then(r => {
      console.log(' === res === ', r);
    });
  };

  const onAddBanner = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      setBannerImage(res);
    } catch (error: any) {
      console.log(' == error ===> ', error, error?.response);
    }
  };
  const onAddGallery = async (index: number) => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      setGallary((p: any) => ({
        ...p,
        [index]: res,
      }));
    } catch (error: any) {
      console.log(' == error ===> ', error, error?.response);
    }
  };

  return (
    <PageContainer loading={loading} useSafeArea={false}>
      <>
        <AddTicket
          show={showAddTicket}
          onClose={() => setShowAddTicket(false)}
          onConfirm={(res: any) => {
            setNewTicket(res);
            setShowAddTicket(false);
            addTicket({
              ...res,
              event_id: event?.id,
            });
          }}
        />
        {step === 1 && (
          <>
            <View style={[styles.inputContianer]}>
              <TouchableOpacity
                style={[
                  styles.vuesaxoutlinegalleryExportParent,
                  {
                    flex: 1,
                    width: width - 40,
                    height: 160,
                  },
                ]}
                onPress={onAddBanner}>
                <GALLERY_EXPORT />
                <Text
                  style={[styles.typeTheVerification, {textAlign: 'center'}]}>
                  Upload cove photo
                </Text>
                {bannerImage && (
                  <Image
                    source={{
                      uri: bannerImage?.assets?.[0].uri,
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
              <View
                style={[
                  styles.ticketContainer,
                  {
                    marginTop: 10,
                    flex: 1,
                    width: width - 40,
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                  },
                ]}>
                {[1, 2, 3, 4, 5, 6].map(index => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => onAddGallery(index)}
                      style={[
                        styles.vuesaxoutlinegalleryExportParent,
                        {marginTop: 12, marginLeft: 5},
                      ]}>
                      {gallary?.[index] ? (
                        <Image
                          source={{
                            uri: gallary?.[index]?.assets?.[0].uri,
                          }}
                          style={{
                            width: '99.%',
                            height: 102,
                            position: 'absolute',
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <PLUS_ADD />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={[styles.inputContianer]}>
              <LabelTypo
                label="Event Details"
                fontSize={20}
                textStyle={styles.headTypo}
              />
            </View>
            <View style={[styles.inputContianer, {marginTop: 10}]}>
              <RadioGroup
                style={styles.radioGroup}
                initialValue={formData?.event_time_type}
                onValueChange={(v: any) =>
                  onChangeInputValue('event_time_type', v)
                }>
                <RadioButton
                  color={Color.crimson}
                  value={'day'}
                  label={'Day'}
                  labelStyle={{color: Color.textWhiteFFFFFF}}
                  size={21}
                />
                <View style={styles.divider} />
                <RadioButton
                  color={Color.crimson}
                  value={'night'}
                  label={'Night'}
                  labelStyle={{color: Color.textWhiteFFFFFF}}
                  size={21}
                />
                <View style={styles.divider} />
                <RadioButton
                  color={Color.crimson}
                  value={'both'}
                  label={'Both'}
                  labelStyle={{color: Color.textWhiteFFFFFF}}
                  size={21}
                />
              </RadioGroup>
              <View style={styles.divider} />

              <AppInput
                onChangeText={(v: any) => onChangeInputValue('event_name', v)}
                placeholder="Event Name"
                label="Event Name"
                value={formData?.event_name}
              />
              <View style={styles.divider} />
              <InputPicker
                label="Event Type"
                placeholder="Event Type"
                mode="MULTI"
                onChangeText={(v: any) => onChangeInputValue('event_type', v)}
                value={formData?.event_type}
              />
              <View style={{width: '100%', paddingLeft: 20, marginTop: 10}}>
                <LabelTypo label="Select Date" />
              </View>
              <InputDatePicker
                placeholder="Select Date"
                mode="MULTI"
                inputStyle={{
                  paddingLeft: 10,
                }}
                onChangeText={(v: any) => onChangeInputValue('event_date', v)}
                value={formData?.event_date}
              />
              <View style={{width: '100%', paddingLeft: 20, marginTop: 10}}>
                <LabelTypo label="Time" />
              </View>
              <View style={styles.timeContainer}>
                <InputTimePicker
                  placeholder="Start Time"
                  mode="MULTI"
                  inputStyle={{
                    width: '100%',
                    paddingTop: 15,
                    paddingLeft: 10,
                    color: Color.textWhiteFFFFFF,
                  }}
                  onChangeText={(v: any) => onChangeInputValue('start_time', v)}
                  value={formData?.start_time}
                />
                <View style={styles.divider} />
                <InputTimePicker
                  placeholder="Start End"
                  inputStyle={{
                    width: '100%',
                    paddingTop: 15,
                    paddingLeft: 10,
                    color: Color.textWhiteFFFFFF,
                  }}
                  onChangeText={(v: any) => onChangeInputValue('end_time', v)}
                  value={formData?.end_time}
                />
              </View>
              <View style={styles.divider} />
              <AppInput
                IconSvg={<INPUT_LOCATION />}
                placeholder="Enter Location"
                label="Location"
                onChangeText={(v: any) => onChangeInputValue('location', v)}
                value={formData?.location}
              />
              <View style={styles.divider} />
              <AppInput
                placeholder="Type Something"
                label="About Event"
                multiline={true}
                numberOfLines={100}
                inputStyle={{
                  height: 150,
                  paddingTop: 10,
                }}
                onChangeText={(v: any) => onChangeInputValue('about_event', v)}
                value={formData?.about_event}
              />
              <View style={styles.divider} />

              <AppInput
                placeholder="type and add"
                label="Amenities"
                value={amenitiesText}
                onChangeText={(text: any) => {
                  setAmenitiesText(text);
                }}
                extraItem={
                  <>
                    <View style={styles.addedAmen}>
                      {amenities
                        .filter(i => i)
                        .map((i: string, index: any) => (
                          <Pill key={index} text={i} />
                        ))}
                    </View>
                    <Button
                      style={styles.addAmen}
                      onPress={() => {
                        setAmenities(
                          prev => [...(prev ?? []), amenitiesText] as string[],
                        );
                        setAmenitiesText('');
                        onChangeInputValue('amenities', amenities.join());
                      }}>
                      <Text style={styles.addAmenText}>Add</Text>
                    </Button>
                  </>
                }
              />
            </View>

            <View style={styles.buttonContianer}>
              <GradientButton text={`Next`} onPress={onHandlerClick} />
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <>
              <View style={styles.inputContianer}>
                <LabelTypo
                  label="Tickets and Payments"
                  fontSize={20}
                  textStyle={styles.headTypo}
                />
                <View style={styles.ticketContainer}>
                  <TouchableOpacity
                    onPress={() => setShowAddTicket(true)}
                    style={styles.vuesaxoutlinegalleryExportParent}>
                    <PLUS_ADD />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
                <LabelTypo
                  textStyle={styles.headTypo}
                  label="Choose a Ticket Purchase Deadline"
                />
                <InputDatePicker
                  inputStyle={{
                    paddingLeft: 10,
                    color: Color.textWhiteFFFFFF,
                  }}
                />
                <View style={styles.divider} />
                <LabelTypo
                  label="Table and Blueprint"
                  fontSize={20}
                  textStyle={styles.headTypo}
                />
                <View style={styles.ticketContainer}>
                  <TouchableOpacity
                    onPress={() => setShowAddTicket(true)}
                    style={styles.vuesaxoutlinegalleryExportParent}>
                    <PLUS_ADD />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
              </View>

              <View style={styles.buttonContianer}>
                <GradientButton text={`Next`} />
              </View>
            </>
          </>
        )}
        <View />
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  headTypo: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: FontFamily.poppinsSemibold,
  },
  ticketContainer: {
    display: 'flex',
    flex: 1,
    width: '100%',
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
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
    top: 70,
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
    height: 105,
    width: 105,
    backgroundColor: Color.gray_300,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Color.textWhiteFFFFFF,
    marginTop: 10,
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

export default CreateEvent;
