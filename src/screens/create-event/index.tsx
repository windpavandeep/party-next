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
import {
  COUPLE_ICON_LIGHT,
  FEMALE_LIGHT,
  GALLERY_EXPORT,
  INPUT_LOCATION,
  MALE_LIGHT,
  PLUS_ADD,
  TRASH,
} from '@assets/icons';
import AppInput, {
  InputDatePicker,
  InputPicker,
  InputTimePicker,
  LabelTypo,
} from '@src/components/Input';
import Pill from '@src/components/pill';
import {Button, RadioButton, RadioGroup} from 'react-native-ui-lib';
import {AddTicket, AddTicketTable} from '@src/components/Modal';
import {useAppDispatch, useAppSelector} from '@src/app/hooks';
import {
  createEventAsync,
  createTicketAsync,
} from '@src/feature/events/eventApi';
import * as ImagePicker from 'react-native-image-picker';
import {
  addEventTicket,
  addImageGallary,
  addImagesEntry,
  bannerChange,
} from '@src/services/event.service';
import {createFormData, renderImage} from '@src/utils/helper';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from '@src/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';

const ShowTicketGridItem = ({
  item,
  onRemoveItem,
}: {
  item: any;
  onRemoveItem: any;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.vuesaxoutlinegalleryExportParent,
        {justifyContent: 'center', alignItems: 'center', padding: 5},
      ]}>
      <View style={styles.ticketHeaderContainer}>
        {item?.ticketType === 'couple' && <COUPLE_ICON_LIGHT />}
        {item?.ticketType === 'male' && <MALE_LIGHT />}
        {item?.ticketType === 'female' && <FEMALE_LIGHT />}
        <Text style={styles.ticketNameText}>
          <Text style={{color: Color.textWhiteFFFFFF}}>
            {item?.total_tickets}
          </Text>{' '}
          {item?.ticketType}
        </Text>
      </View>
      <Text style={styles.ticketTypeText}>{item?.list}</Text>
      {item?.timeonoff && (
        <Text style={styles.ticketTimeText}>{item?.beforeAfetr} 9:30 PM</Text>
      )}
      <View style={styles.dividerLine} />
      <View style={styles.ticketFooter}>
        <Text style={styles.pricePrint}>Rs. {item?.price}</Text>
        <TouchableOpacity onPress={onRemoveItem}>
          <TRASH />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ShowTicketGridTableItem = ({item}: {item: any}) => {
  return (
    <TouchableOpacity
      style={[
        styles.vuesaxoutlinegalleryExportParent,
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          height: 120,
          width: '49%',
        },
      ]}>
      <View style={styles.ticketHeaderContainer}>
        <Text style={[styles.ticketNameText, {marginLeft: 0}]}>
          <Text style={{color: Color.textWhiteFFFFFF}}>
            {item?.table_no} for
          </Text>{' '}
          {item?.total_no_people} people
        </Text>
      </View>
      <View style={styles.makePillContainer}>
        {item?.table_type && (
          <Text style={[styles.ticketTypeText, styles.makePill]}>
            {item?.table_type}
          </Text>
        )}

        {item?.table_style && (
          <Text
            style={[styles.ticketTypeText, styles.makePill, {marginLeft: 5}]}>
            {item?.table_style}
          </Text>
        )}
      </View>
      {item?.timeonoff && (
        <Text style={styles.ticketTimeText}>{item?.beforeAfetr} 9:30 PM</Text>
      )}
      <View style={styles.dividerLine} />
      <View style={styles.ticketFooter}>
        <Text style={styles.pricePrint}>Rs. {item?.price}</Text>
        <TRASH />
      </View>
    </TouchableOpacity>
  );
};

const CreateEvent = () => {
  const {params} = useRoute() as any;
  const [bannerImage, setBannerImage] = React.useState<any>(null);
  const [gallary, setGallary] = React.useState<any>(null);
  const [showAddTicket, setShowAddTicket] = React.useState<boolean>(false);
  const [showAddTicketTable, setShowAddTicketTable] =
    React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [amenities, setAmenities] = React.useState<string[]>(['']);
  const [amenitiesText, setAmenitiesText] = React.useState<string>('');
  const [privacy, setPrivacy] = React.useState<string[]>(['']);
  const [privacyText, setPrivacyText] = React.useState<string>('');
  const [newTicket, setNewTicket] = React.useState<object[]>([]);
  const [newTicketTable, setNewTicketTable] = React.useState<object[]>([]);
  const [formData, setFormData] = React.useState<object>({}) as any;
  const [last_booking_date, setLastBookingDate] = React.useState<any>();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(({authUser}) => authUser) as any;
  const {loading, event} = useAppSelector(({eventSlice}) => eventSlice) as any;
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    let imgs = {};
    (params?.images ?? []).forEach((im: any, index: any) => {
      imgs = {
        ...imgs,
        [index]: {
          uri: renderImage(im?.url),
        },
      };
    });
    setGallary(imgs);
    setNewTicket(
      (params?.tickets ?? [])
        .filter((i: any) => i?.type === 'ticket')
        .map((i: any) => ({
          beforeAfetr: i?.beforeafter,
          list: i?.visit_type,
          name: i?.name,
          price: i?.price,
          ticketType: i?.ticket_type,
          time: i?.ticket_time,
          timeonoff: i?.onoff,
          total_tickets: i?.total_ticket,
          event_id: event?.id,
          id: i?.id,
        })),
    );
    setNewTicketTable(
      (params?.tickets ?? [])
        .filter((i: any) => i?.type === 'table')
        .map((i: any) => ({
          table_no: i?.name,
          total_tickets: i?.total_ticket,
          total_no_people: i?.no_of_people,
          table_style: i?.table_type,
          price: i?.price,
          table_type: i?.visit_type,
          event_id: i?.event_id,
          id: i?.id,
        })),
    );
    setFormData({
      ...params?.eventDetail,
      event_type: (params?.eventDetail?.event_type ?? '').split(),
    });
    setLastBookingDate(params?.eventDetail?.last_booking_date);
    setPrivacy((params?.eventDetail?.terms ?? '').split(','));
    setAmenities((params?.eventDetail?.amenities ?? '').split(','));
    setBannerImage({
      assets: [
        {
          uri: renderImage(params?.eventDetail?.cover_pic),
        },
      ],
    });
  }, []);

  console.log(' ==== FormDatab ====> ', params?.tickets);
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

    console.log(payload);

    dispatch(createEventAsync(payload)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setStep(p => p + 1);
      }
    });
  };

  const addTicket = () => {
    if (newTicket.length < 0) {
      Toast.show({
        type: 'error',
        text1: 'Please add atleast one ticket.',
      });
    } else {
      const payload = {
        ...(newTicket.length > 0 && {
          tickets: newTicket.map((i: any) => ({
            beforeafter: i?.beforeAfetr,
            visit_type: i?.list,
            name: i?.name,
            price: i?.price,
            ticket_type: i?.ticketType,
            ticket_time: i?.time,
            onoff: i?.timeonoff,
            total_ticket: i?.total_tickets,
            event_id: event?.id,
            ...(i?.id && {
              id: i?.id,
            }),
          })),
        }),
        ...(newTicketTable.length > 0 && {
          tables: newTicketTable.map((i: any) => ({
            name: i?.table_no,
            total_ticket: i?.total_tickets,
            total_table: i?.table_no,
            no_of_people: i?.total_no_people,
            table_type: i?.table_style,
            price: i?.price,
            visit_type: i?.table_type,
            event_id: event?.id,
            ...(i?.id && {
              id: i?.id,
            }),
          })),
        }),
        event_id: event?.id,
        updatedKeys: {
          statuss: 'publish',
          last_booking_date: last_booking_date,
          ...(formData?.offer_name && {
            offer_name: formData?.offer_name,
          }),
          ...(formData?.offer_code && {
            offer_code: formData?.offer_code,
          }),
          ...(formData?.privacy && {
            terms: formData?.privacy,
          }),
        },
      };
      dispatch(createTicketAsync(payload)).then(r => {
        console.log(' === res === ', r);
        if (r.meta.requestStatus === 'fulfilled') {
          navigate('Home');
        }
      });
    }
  };

  const onAddBanner = async () => {
    try {
      const res = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      setBannerImage(res);
      await bannerChange(
        createFormData('banner', res?.assets?.[0], {}),
        event?.id,
      );
      const ext: any = (res?.assets?.[0]?.fileName ?? '').split('.').pop();
      const imageName = `${event?.id}-banner.${ext}`;

      const update = await addEventTicket({
        event_id: event?.id || formData?.id,
        updatedKeys: {
          cover_pic: imageName,
        },
      });
      console.log(' === update ====> ', update);
    } catch (error) {
      console.log(' == error ===> ', error);
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
        [index]: res?.assets?.[0],
      }));

      await addImageGallary(
        createFormData('image', res?.assets?.[0], {}),
        event?.id,
        index,
      );
      const ext: any = (res?.assets?.[0]?.fileName ?? '').split('.').pop();
      const imageName = `${event?.id}-${index}-gallary.${ext}`;

      await addImagesEntry([
        {
          url: imageName,
          event_id: event?.id,
        },
      ]);
    } catch (error: any) {
      console.log(' == error ===> ', error, error?.response);
    }
  };

  const ticketRemovee = React.useCallback(
    (index: number) => {
      setNewTicket(p => {
        const arr = p;
        arr.splice(index, 1);
        return p;
      });
    },
    [newTicket],
  );

  const renderTickets = React.useMemo((): any => {
    return (
      <>
        {newTicket.map((t, index) => (
          <ShowTicketGridItem
            onRemoveItem={() => ticketRemovee(index)}
            key={index}
            item={t}
          />
        ))}
      </>
    );
  }, [newTicket]);

  return (
    <PageContainer loading={loading} useSafeArea={false}>
      <>
        <AddTicket
          show={showAddTicket}
          onClose={() => setShowAddTicket(false)}
          onConfirm={(res: any) => {
            setNewTicket(p => [...p, res]);
            setShowAddTicket(false);
          }}
        />
        <AddTicketTable
          show={showAddTicketTable}
          onClose={() => setShowAddTicketTable(false)}
          onConfirm={(res: any) => {
            setNewTicketTable(p => [...p, res]);
            setShowAddTicketTable(false);
          }}
        />
        {step === 1 && (
          <>
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
                  inputStyle={{
                    width: '100%',
                    paddingTop: 15,
                    paddingLeft: 10,
                    color: Color.textWhiteFFFFFF,
                  }}
                  onChangeText={(v: any) => {
                    console.log(' === datae ====> ', v);
                    onChangeInputValue('start_time', v);
                  }}
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
                {[0, 1, 2, 3, 4, 5].map(index => {
                  console.log(' == gallary ===> ', gallary?.[index]);
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
                            uri: gallary?.[index].uri,
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
            <View style={styles.inputContianer}>
              <LabelTypo
                label="Tickets and Payments"
                fontSize={20}
                textStyle={styles.headTypo}
              />
              <View style={styles.ticketContainer}>
                {renderTickets}
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
                onChangeText={(date: any) => setLastBookingDate(date)}
                value={last_booking_date}
              />
              <View style={styles.divider} />
              <LabelTypo
                label="Table and Blueprint"
                fontSize={20}
                textStyle={styles.headTypo}
              />
              <View style={styles.ticketContainer}>
                {newTicketTable.map((t, index) => (
                  <ShowTicketGridTableItem key={index} item={t} />
                ))}
                <TouchableOpacity
                  onPress={() => setShowAddTicketTable(true)}
                  style={[
                    styles.vuesaxoutlinegalleryExportParent,
                    {
                      height: 120,
                      width: '49%',
                    },
                  ]}>
                  <PLUS_ADD />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <LabelTypo
                label="Create Offer"
                fontSize={20}
                textStyle={[styles.headTypo, {marginLeft: 10}]}
              />
              <AppInput
                onChangeText={(v: any) => onChangeInputValue('offer_name', v)}
                placeholder="20%"
                label="Offer Name"
                value={formData?.offer_name}
              />
              <View style={styles.divider} />
              <AppInput
                onChangeText={(v: any) => onChangeInputValue('offer_code', v)}
                placeholder="HAPPYFRIDAY"
                label="Offer Code"
                value={formData?.offer_code}
              />
              <View style={styles.divider} />
              <LabelTypo
                label="Terms & Condition"
                fontSize={20}
                textStyle={[styles.headTypo, {marginLeft: 10}]}
              />
              <View style={styles.divider} />
              <View style={styles.privacyContainer}>
                {privacy
                  .filter(i => i)
                  .map((i, inx) => {
                    return (
                      <Text style={styles.privacyText} key={inx}>
                        {'\u25CF'} {i}
                      </Text>
                    );
                  })}
              </View>
              <View style={styles.divider} />
              <AppInput
                placeholder="Type Terms & Condition"
                value={privacyText}
                onChangeText={(text: any) => {
                  setPrivacyText(text);
                }}
                extraItem={
                  <>
                    <Button
                      style={[
                        styles.addAmen,
                        {
                          top: 15,
                        },
                      ]}
                      onPress={() => {
                        setPrivacy(
                          prev => [...(prev ?? []), privacyText] as string[],
                        );
                        setPrivacyText('');
                        onChangeInputValue('privacy', amenities.join());
                      }}>
                      <Text style={styles.addAmenText}>Add</Text>
                    </Button>
                  </>
                }
              />
            </View>

            <View style={styles.buttonContianer}>
              <GradientButton onPress={addTicket} text={`Publish Event`} />
            </View>
          </>
        )}
        <View />
      </>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  privacyText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.gray_200,
    width: '100%',
    lineHeight: 19,
    flexDirection: 'row',
  },
  privacyContainer: {
    width: '90%',
    flexDirection: 'column',
  },
  makePillContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
  },
  makePill: {
    borderWidth: 1,
    borderColor: Color.gray_200,
    borderRadius: 10,
    width: 'auto',
    padding: 5,
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsRegular,
  },
  pricePrint: {
    fontFamily: FontFamily.poppinsSemibold,
    fontSize: FontSize.size_xs,
    color: Color.textWhiteFFFFFF,
  },
  ticketHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  ticketNameText: {
    fontSize: FontSize.size_3xs + 2,
    fontFamily: FontFamily.poppinsRegular,
    marginLeft: 10,
    color: Color.gray_200,
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: Color.gray_200,
    marginTop: 10,
  },
  ticketFooter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ticketTypeText: {
    fontSize: FontSize.size_3xs + 2,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.gray_200,
    textAlign: 'left',
    width: '100%',
  },
  ticketTimeText: {
    fontSize: FontSize.size_3xs + 2,
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.textWhiteFFFFFF,
    textAlign: 'left',
    width: '100%',
  },
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
