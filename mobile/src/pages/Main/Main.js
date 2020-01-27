import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {
	requestPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location';

import api from '../../service/api';
import { connect, disconnect, subscribeToNewDevs } from '../../service/socket';

import styles from './styles';

function Main({ navigation }) {
	const [currentRegion, setCurrentRegion] = useState(null);
	const [techs, setTechs] = useState('');
	const [devs, setDevs] = useState([]);

	useEffect(() => {
		async function loadInitialPosition() {
			const { granted } = await requestPermissionsAsync();

			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				});

				const { latitude, longitude } = coords;

				setCurrentRegion({
					latitude,
					longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				});
			}
		}

		loadInitialPosition();
	}, []);

	useEffect(() => {
		subscribeToNewDevs(dev => setDevs([...devs, dev]));
	}, [devs]);

	function setupWebSocket() {
		disconnect();

		const { latitude, longitude } = currentRegion;

		connect(latitude, longitude, techs);
	}

	async function loadDevs() {
		const { latitude, longitude } = currentRegion;

		const res = await api.get('/search', {
			params: {
				latitude,
				longitude,
				techs
			}
		});

		setDevs(res.data);
		setupWebSocket();
	}

	async function handledRegionChanged(region) {
		setCurrentRegion(region);
	}

	return (
		<>
			<MapView
				onRegionChangeComplete={handledRegionChanged}
				initialRegion={currentRegion}
				style={styles.map}
				rotateEnabled={false}
			>
				{devs.map(dev => (
					<Marker
						key={dev._id}
						coordinate={{
							latitude: dev.location.coordinates[0],
							longitude: dev.location.coordinates[1]
						}}
					>
						<Image style={styles.avatar} source={{ uri: dev.avatar }} />

						<Callout
							onPress={() => {
								navigation.navigate('Profile', {
									login: dev.login
								});
							}}
						>
							<View style={styles.callout}>
								<Text style={styles.devName}>{dev.name}</Text>
								<Text style={styles.devBio}>{dev.bio}</Text>
								<Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<View style={styles.searchForm}>
				<TextInput
					style={styles.searchInput}
					placeholder="Buscar devs por techs..."
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={text => setTechs(text)}
				/>

				<TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
					<MaterialIcons name="my-location" size={20} color="#FFF" />
				</TouchableOpacity>
			</View>
		</>
	);
}

export default Main;
