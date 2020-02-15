import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

export default StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center'
  },
  Form: {
    marginHorizontal: 30,
    marginVertical: 60,
    padding: 20,
    borderRadius: 2,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5
  },
  InputGroup: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  Button: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: color.purple,
    borderRadius: 2,
    height: 50,
    justifyContent: 'center'
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto'
  }
});
