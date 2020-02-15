import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

export default StyleSheet.create({
  InputBox: {
    marginTop: 20
  },
  Text: {
    color: color.grayAsh,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  TextInput: {
    height: 32,
    fontFamily: 'Roboto',
    color: color.grayAsh,
    borderBottomColor: color.purple,
    borderBottomWidth: 1
  }
});
