import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../service/api';

import { styles, color } from './styles';

export default function Main({ navigation }) {
	const [techs, setTechs] = useState('');
	const [devs, setDevs] = useState([]);
	const [currentRegion, setCurrentRegion] = useState({
		latitude: navigation.getParam('latitude'),
		longitude: navigation.getParam('longitude'),
		latitudeDelta: 0.005,
		longitudeDelta: 0.005
	});

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
	}

	async function handledRegionChanged(region) {
		setCurrentRegion(region);
		loadDevs();
	}

	return (
		<>
			<MapView
				onRegionChangeComplete={handledRegionChanged}
				initialRegion={currentRegion}
				style={styles.MapView}
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
						<Image style={styles.Avatar} source={{ uri: dev.avatar }} />

						<Callout
							onPress={() => {
								navigation.navigate('Profile', {
									login: dev.login
								});
							}}
						>
							<View style={styles.Callout}>
								<Text style={styles.DevName}>{dev.name}</Text>
								<Text style={styles.DevBio}>{dev.bio}</Text>
								<Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<View style={styles.SearchForm}>
				<TextInput
					style={styles.SearchInput}
					placeholder="Buscar devs por techs..."
					placeholderTextColor={color.greyLight}
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={text => setTechs(text)}
					onSubmitEditing={loadDevs}
					returnKeyType="search"
				/>

				<TouchableOpacity onPress={loadDevs} style={styles.LoadButton}>
					<MaterialIcons name="my-location" size={20} color="white" />
				</TouchableOpacity>
			</View>
		</>
	);
}
