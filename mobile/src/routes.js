import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Main from './pages/Main';
import MapView from './pages/Map';
import Devs from './pages/Devs';

import { MainSVG, MapSVG, DevsSVG } from './components/Icons';

import color from './utils/colors';

export default createAppContainer(
  createBottomTabNavigator(
    {
      Main: { screen: Main, navigationOptions: { tabBarIcon: <MainSVG /> } },
      Map: { screen: MapView, navigationOptions: { tabBarIcon: <MapSVG /> } },
      Devs: { screen: Devs, navigationOptions: { tabBarIcon: <DevsSVG /> } }
    },
    {
      initialRouteName: 'Map',
      tabBarOptions: {
        activeBackgroundColor: color.purpleDark,
        inactiveBackgroundColor: color.purple,
        labelStyle: {
          fontSize: 14,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          color: 'white'
        }
      }
    }
  )
);
