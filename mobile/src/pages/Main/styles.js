import { StyleSheet } from 'react-native';
import color from '../../utils/colors';

exports.styles = StyleSheet.create({
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
	DevBio: {
		color: color.grayAsh,
		marginTop: 5
	},
	DevName: {
		fontSize: 16,
		fontWeight: 'bold',
		borderBottomWidth: 1,
		borderBottomColor: color.purple
	},
	DevTechs: {
		marginTop: 5
	},
	LoadButton: {
		alignItems: 'center',
		backgroundColor: color.purple,
		borderRadius: 25,
		height: 50,
		justifyContent: 'center',
		marginLeft: 15,
		width: 50
	},
	SearchForm: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		flexDirection: 'row',
		zIndex: 5
	},
	SearchInput: {
		backgroundColor: 'white',
		borderRadius: 25,
		color: color.grayDark,
		flex: 1,
		fontSize: 16,
		height: 50,
		paddingHorizontal: 20,
		elevation: 2,
		shadowColor: 'black',
		shadowOffset: {
			width: 4,
			height: 4
		},
		shadowOpacity: 0.2
	},
	MapView: {
		flex: 1
	}
});

exports.color = color;
