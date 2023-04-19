import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {func, string} from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../comman/theme';


const IconButton = ({onPress, name, backgroundColor, color}) => (
  <TouchableOpacity
    style={[styles.singleButton, {backgroundColor}]}
    onPress={onPress}
    activeOpacity={0.85}>
    <Icon name={name} size={20} color={color} />
  </TouchableOpacity>
);
IconButton.defaultProps = {
  color: COLORS.white,
  backgroundColor: COLORS.heartColor,
};
IconButton.propTypes = {
  onPress: func.isRequired,
  name: string.isRequired,
  color: string,
  backgroundColor: string,
};
export default IconButton;

const styles = StyleSheet.create({
  singleButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 6,
    padding: 15,
  },
});