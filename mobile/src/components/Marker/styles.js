import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

export default StyleSheet.create({
  Avatar: {
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 4,
    height: 54,
    width: 54
  },
  Callout: {
    width: 260
  },
  DevName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    borderBottomWidth: 1,
    borderBottomColor: color.purple
  },
  DevBio: {
    paddingVertical: 5,
    fontFamily: 'Roboto',
    color: color.grayDark
  },
  DevTechs: {
    fontFamily: 'Roboto',
    fontStyle: 'italic'
  }
});
