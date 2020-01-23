import { StyleSheet } from 'react-native';

const $white = '#FFF';
const $backgroundButton = '#8E4DFF';
const $gray = '#666';
const $shadow = '#000';
const $searchColor = '#333';

export default StyleSheet.create({
	avatar: {
		borderColor: $white,
		borderRadius: 4,
		borderWidth: 4,
		height: 54,
		width: 54
	},
	callout: {
		width: 260
	},
	devBio: {
		color: $gray,
		marginTop: 5
	},
	devName: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	devTechs: {
		marginTop: 5
	},
	loadButton: {
		alignItems: 'center',
		backgroundColor: $backgroundButton,
		borderRadius: 25,
		height: 50,
		justifyContent: 'center',
		marginLeft: 15,
		width: 50
	},
	map: {
		flex: 1
	},
	searchForm: {
		flexDirection: 'row',
		left: 20,
		position: 'absolute',
		right: 20,
		top: 20,
		zIndex: 5
	},
	searchInput: {
		backgroundColor: $white,
		borderRadius: 25,
		color: $searchColor,
		elevation: 1,
		flex: 1,
		fontSize: 16,
		height: 50,
		paddingHorizontal: 20,
		shadowColor: $shadow,
		shadowOffset: {
			width: 4,
			height: 4
		},
		shadowOpacity: 0.2
	}
});
