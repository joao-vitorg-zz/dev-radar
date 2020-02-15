import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

export default StyleSheet.create({
  Container: {
    padding: 15,
    borderRadius: 2,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5
  },
  Header: {
    flexDirection: 'row'
  },
  DevAvatar: {
    borderRadius: 50,
    height: 54,
    width: 54
  },
  Info: {
    fontFamily: 'Roboto',
    marginLeft: 15
  },
  DevName: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: color.purple
  },
  DevTechs: {
    fontFamily: 'Roboto',
    color: color.grayAsh,
    fontStyle: 'italic'
  },
  DevTools: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  DevBio: {
    fontFamily: 'Roboto',
    color: color.grayAsh,
    lineHeight: 20,
    marginTop: 10
  },
  DevBlog: {
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: color.purple
  }
});
