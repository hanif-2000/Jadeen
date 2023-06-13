import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { BottomSheet } from 'react-native-sheet';
import { Dropdown } from 'react-native-element-dropdown';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';

import Container from '../common/Container';
import GlobalHeader from '../common/GlobalHeader';
import Card from '../component/Card';
import IconButton from '../component/IconButton';
import { COLORS, HP_WP, IMAGE, SIZE, Font } from '../common/theme';
import photoCards from '../component/photoCards';
import useAppData, { useStore } from '../service/AppData';
import { UserListing_API, likePost } from '../service/API';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('male');
  const [minimumSlideValue, setMinimumSlideValue] = useState([100]);
  const [maximumSlideValue, setMaximumSliderValue] = useState([18]);
  const [changeValue, setChangeValue] = useState(0);
  const [userList, setUserList] = useState([{}])
  const [{ userId }] = useAppData();
  const [type, setType] = useState(null)

  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('data', JSON.stringify([{ "user_id": userId }]));
    UserListing_API(formData, onResponse, onError)
  }

  const onResponse = (data) => {
    setLoading(false)
    setUserList(data?.result)
    console.log('onResponse---', data.result);
  }
  const onError = (e) => {
    setLoading(false)
    console.warn('onError--', e);
  }

  const onPostLike = (id) => {
    setLoading(true)
    let tmp = {
      "user_id": "1",
      "post_id": id
    }
    likePost(tmp, onlikePostResponse, onlikePostError)

  }

  const onlikePostResponse = (res) => {
    // console.warn(res);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: res.message,
    });
    this.swiper.swipeRight(type);
    setLoading(false)
  }

  const onlikePostError = (e) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: e.message,
    });
    setLoading(false)
  }
  const data = [
    { label: '20 Mtr-30 Mtr', value: '1' },
    { label: '30 Mtr-40 Mtr', value: '2' },
    { label: '40 Mtr-50 Mtr', value: '3' },
    { label: '50 Mtr-60 Mtr', value: '4' },
    { label: '60 Mtr-70 Mtr', value: '5' },
    { label: '70 Mtr-80 Mtr', value: '6' },
    { label: '80 Mtr-90 Mtr', value: '7' },
    { label: '90 Mtr-10 Mtr', value: '8' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const bottomSheet = useRef(null);

  const onSwipedLeft = (t) => {
    this.swiper.swipeLeft(t);
  };

  const onSwipedRight = (t, id) => {
    setType(t)
    onPostLike(id)
  };
  return (
    <Container>
      <GlobalHeader
        withoutIcon={true}
        logo={true}
        rightImage={true}
        mainContainer={{ paddingHorizontal: HP_WP.wp(5) }}
        rightIcon={require('../assets/images/filter.png')}
        onPressRight={() => bottomSheet.current?.show()}
      />
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper;
          }}
          verticalSwipe={false}
          backgroundColor={COLORS.white}
          animateCardOpacity
          cards={userList}
          renderCard={card => <Card card={card} onSwipedLeft={() => onSwipedLeft('left')} onSwipedRight={(id) => onSwipedRight('right', id)} />}
          cardIndex={0}
          stackSize={2}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
        />
      </View>
      {/* 
      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={() => onSwipedLeft('left')}
          color={COLORS.white}
          backgroundColor={COLORS.red}
          type="AntDesign"
        />
        <IconButton
          name="dollar"
          onPress={() => navigation.navigate('PlanSetting')}
          color={COLORS.white}
          backgroundColor={COLORS.yellow}
          type="fontisto"
        />
        <IconButton
          name="heart"
          onPress={() => onSwipedRight('right')}
          color={COLORS.white}
          backgroundColor={COLORS.purple}
          type="entypo"
        />
      </View> */}
      <BottomSheet
        backdropBackgroundColor="rgba(0,0,0,0.5)"
        draggable={false}
        sheetStyle={styles.sheet}
        height={350}
        ref={bottomSheet}>
        <SafeAreaView style={{ flex: 1 }} >

          <GlobalHeader
            title={t('filter')}
            rightImage={true}
            rightIcon={IMAGE.check}
            drawerPress
            onPressRight={() => bottomSheet.current?.hide()}
            onPress={() => bottomSheet.current?.hide()}
          />
          <View style={styles.sheetContainer}>
            <Text style={styles.distanceText}>{t('distance')}</Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={t('selectDistance')}
              // searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={styles.distanceText}>{t('gender')}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setGender('male')}
                style={[gender == 'male' ? styles.activeButton : styles.button]}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: gender == 'male' ? COLORS.white : COLORS.light },
                  ]}>
                  {t('male')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('female')}
                style={[
                  gender == 'female' ? styles.activeButton : styles.button,
                  {
                    borderLeftWidth: gender == 'male' ? 0 : 1,
                    borderRightWidth: gender == 'shemale' ? 0 : 1,
                  },
                ]}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: gender == 'female' ? COLORS.white : COLORS.light },
                  ]}>
                  {t('female')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('shemale')}
                style={gender == 'shemale' ? styles.activeButton : styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: gender == 'shemale' ? COLORS.white : COLORS.light },
                  ]}>
                  {t('shemale')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.distanceText}>{'age'}</Text>
              <Text style={styles.distanceText}>{changeValue && changeValue[0]}-{changeValue && changeValue[1]}</Text>
            </View>

          </View>
          <MultiSlider
            sliderLength={300}
            containerStyle={{
              marginLeft: 2,
              alignSelf: 'center',
            }}
            trackStyle={{
              height: 3,
              backgroundColor: '#CACACA',
              borderRadius: 5,
            }}
            valuePrefix="age"
            values={[maximumSlideValue, minimumSlideValue]}
            onValuesChange={value => setChangeValue(value, console.log(value))}
            selectedStyle={{
              backgroundColor: COLORS.purple,
            }}
            markerStyle={{
              backgroundColor: COLORS.purple,
              top: 0.8
            }}
            step={1}
            isMarkersSeparated={true}
            min={18}
            max={70}
            allowOverlap
          />
        </SafeAreaView>
      </BottomSheet>
      <Spinner
        color={COLORS.purple}
        visible={loading}
        size="large"
        overlayColor="rgba(0,0,0,0.5)"
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  swiperContainer: {
    height: HP_WP.hp(70),
  },
  sheet: {
    position: 'absolute',
    top: 0,
    paddingTop: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: COLORS.white,
    height: 350,
    paddingHorizontal: HP_WP.wp(5),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sheetContainer: {
    marginHorizontal: 25,
  },
  distanceText: {
    color: COLORS.black,
    fontSize: SIZE.L,
    fontFamily: Font.medium,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
  },
  button: {
    width: '33%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: COLORS.gray,
    borderRightColor: COLORS.gray,
  },
  buttonText: {
    color: COLORS.gray,
    fontSize: SIZE.N,
    fontFamily: Font.regular,
  },
  activeButton: {
    backgroundColor: COLORS.purple,
    width: '34%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 34,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: SIZE.N,
    color: COLORS.darkGray,
    fontFamily: Font.regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: COLORS.lightGray,
  },
});
