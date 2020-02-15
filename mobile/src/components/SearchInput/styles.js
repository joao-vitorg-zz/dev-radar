import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

exports.styles = StyleSheet.create({
  ContainerAbsolute: {
    flexDirection: 'row',
    position: 'absolute',
    margin: 15
  },
  Container: {
    flexDirection: 'row',
    margin: 15
  },
  SearchInput: {
    backgroundColor: 'white',
    borderRadius: 2,
    color: color.grayDark,
    fontFamily: 'Roboto',
    flex: 1,
    fontSize: 16,
    height: 45,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.2
  }
});

exports.color = color;
