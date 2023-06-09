import { StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, { useState } from 'react';
import { CountryPicker } from 'react-native-country-codes-picker';
import Moment from 'moment';
import { t } from 'i18next';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Toast from 'react-native-toast-message';
import { setAccountSetting_API } from '../service/API'

import Container from '../common/Container';
import GlobalHeader from '../common/GlobalHeader';
import { COLORS, Font, HP_WP, SIZE } from '../common/theme';
import GlobalInput from '../common/GlobalInput';
import GlobalButton from '../common/GlobalButton';

const ProfileEdit = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState();

  const [openCountryPicker, setOpenCountryPicker] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isCounty, setCountry] = useState();

  const [name, setName] = useState()
  const [number, setNumber] = useState()
  const [email, setEmail] = useState()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(Moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
    console.warn('date', Moment(date).format('DD-MM-YYYY'));
  };

  const onSave = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('id', '5');
    formData.append('name', name);
    formData.append('phone_number', number);
    formData.append('email', email);
    formData.append('dob', date);
    setAccountSetting_API(formData, onResponse, onError)
  }

  const onResponse = (data) => {
    setLoading(false)
    console.warn('onResponse---', data);
    navigation.goBack()
  }
  const onError = (e) => {
    setLoading(false)
    console.warn('onError--', e);
  }

  return (
    <Container>
      <GlobalHeader
        title={t('edit')}
        mainContainer={{ marginHorizontal: HP_WP.wp(4) }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.accountSettings}>{t('accountSettings')}</Text>
        <GlobalInput placeholder={'Jenny'} inputStyle={{ marginTop: 10 }} />
        <GlobalInput
          placeholder="9876543210"
          keyboardType={'number-pad'}
          countryCode
          code={[countryCode]}
          openCode={() => setOpenCountryPicker(true)}
          inputStyle={{ marginTop: 10 }}
          textInputStyle={styles.input}
        />
        <GlobalInput
          onPress={showDatePicker}
          editable={false}
          icon
          iconName="calendar"
          iconType="entypo"
          placeholder={'02-05-1997'}
          inputStyle={{ marginTop: 10 }}
          value={date}
        />

        <GlobalInput
          placeholder={'abcqwertyu@gmail.com'}
          inputStyle={{ marginTop: 10 }}
        />
        <GlobalButton
          onPress={() => onSave()}
          // onPress={() => navigation.goBack()}
          Style={styles.button}
          title={t('save')}
        />
      </View>
      <CountryPicker
        show={openCountryPicker}
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setOpenCountryPicker(false);
          setCountry(item.code);
        }}
        onBackdropPress={() => {
          setOpenCountryPicker(false);
        }}
        placeholderTextColor={COLORS.black}
        style={styles.countryPicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={new Date(Date.now() - 86400000)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.5)"
      />
    </Container>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: HP_WP.wp(4),
  },
  accountSettings: {
    marginTop: HP_WP.hp(4),
    color: COLORS.black,
    fontSize: SIZE.L,
    fontFamily: Font.medium,
  },
  button: {
    marginTop: HP_WP.hp(3),
  },
  countryPicker: {
    modal: {
      width: '100%',
      bottom: 0,
      position: 'absolute',
      height: Platform.OS === 'ios' ? 500 : 360,
    },
    countryName: {
      color: COLORS.black,
    },
    textInput: {
      color: COLORS.black,
      paddingHorizontal: 10,
    },
    dialCode: {
      color: COLORS.black,
    },
    searchMessageText: {
      color: COLORS.black,
    },
  },
  input: {
    marginLeft: 7,
    marginTop: 4,
  },
});
