import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

exports.styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: color.gray
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
		color: 'white'
	},
	Form: {
		marginHorizontal: 30,
		marginVertical: 40,
		padding: 20,
		borderRadius: 2,
		alignSelf: 'stretch',
		backgroundColor: 'white',
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: {
			width: 4,
			height: 4
		},
		shadowOpacity: 0.2
	},
	Strong: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center',
		color: color.grayDark
	},
	HaveAccountText: {
		paddingTop: 30,
		textAlign: 'center',
		color: color.ashGray,
		fontSize: 16,
		fontWeight: 'bold'
	},
	HaveAccountButtonText: {
		color: color.purple,
		fontWeight: 'bold'
	},
	Text: {
		color: color.grayAsh,
		fontWeight: 'bold'
	},
	TextInput: {
		height: 32,
		color: color.grayAsh,
		borderBottomColor: color.purple,
		borderBottomWidth: 1
	},
	InputBox: {
		marginTop: 20
	}
});

exports.color = color;
