import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01
	}
};

const Routes = createAppContainer(
	createStackNavigator(
		{
			Login: {
				screen: Login,
				navigationOptions: {
					title: 'Login'
				}
			},
			Main: {
				screen: Main,
				navigationOptions: {
					title: 'DevRadar'
				}
			},
			Profile: {
				screen: Profile,
				navigationOptions: ({ navigation }) => ({
					title: `${navigation.state.params.login}'s Profile'`
				})
			}
		},
		{
			defaultNavigationOptions: {
				headerTintColor: '#FFF',
				headerBackTitleVisible: false,
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: '#7D40E7'
				}
			}
		}
	)
);

export default Routes;
