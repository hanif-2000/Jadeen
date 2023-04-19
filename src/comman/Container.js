import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS, HP_WP } from './theme';

const Container = ({ isLight, translucent, children, Style, hidden }) => {
  return (
    <SafeAreaView style={[{flex:1,backgroundColor:COLORS.white}]}>
      <View style={[styles.container, Style]}>
        <StatusBar
          animated={true}
          backgroundColor={"#000"}
          barStyle={isLight ? 'light-content' : 'dark-content'}
          translucent={translucent}
          hidden={hidden ? true : false}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {children}
        </KeyboardAvoidingView>
      </View>
      </SafeAreaView>
  );
};
export default Container;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    width: HP_WP.wp(100),
    alignSelf: 'center',
  },
});
