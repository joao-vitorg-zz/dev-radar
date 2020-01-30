import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Profile from './pages/Profile';

import color from './utils/colors';

export default Routes = createAppContainer(
	createStackNavigator(
		{
			SignUp: {
				screen: SignUp,
				navigationOptions: {
					title: 'Sign Up'
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
					title: navigation.state.params.login
				})
			}
		},
		{
			defaultNavigationOptions: {
				headerTintColor: 'white',
				headerBackTitleVisible: false,
				headerTitleAlign: 'center',
				headerStyle: {
					backgroundColor: color.purple
				}
			}
		}
	)
);
