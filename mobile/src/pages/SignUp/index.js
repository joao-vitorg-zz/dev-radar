import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
	requestPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location';

import api from '../../service/api';

import InputBlock from './inputBlock';

import { styles } from './styles';

export default function DevForm({ navigation }) {
	const [login, setLogin] = useState('');
	const [techs, setTechs] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

	useEffect(() => {
		async function loadInitialPosition() {
			const { granted } = await requestPermissionsAsync();

			if (granted) {
				const { coords } = await getCurrentPositionAsync({
					enableHighAccuracy: true
				});

				const { latitude, longitude } = coords;

				setLatitude(latitude);
				setLongitude(longitude);
			}
		}

		loadInitialPosition();
	}, []);

	async function handleSubcribe() {
		const res = await api.post('/devs', {
			login,
			techs,
			latitude,
			longitude
		});

		if (res.status !== 200) {
			alert(res);
			setLogin('');
			setTechs('');
		}

		navigation.navigate('Main', {
			latitude,
			longitude
		});
	}

	return (
		<ScrollView style={styles.Container}>
			<View style={styles.Form}>
				<Text style={styles.Strong}>Cadastrar</Text>

				<InputBlock
					text="Usuário do Github"
					placeholder="Login"
					value={[login, setLogin]}
					id="login"
					next="techs"
				/>

				<InputBlock
					text="Tecnologías"
					placeholder="Ex.: Js, HTML, CSS..."
					value={[techs, setTechs]}
					id="techs"
					next="latitude"
				/>

				<View style={{ flexDirection: 'row' }}>
					<InputBlock
						text="Latitude"
						placeholder="Digite sua latitude"
						value={[latitude, setLatitude]}
						id="latitude"
						next="longitude"
						type="numeric"
						style={{ marginRight: 20 }}
					/>

					<InputBlock
						text="Longitude"
						placeholder="Digite sua longitude"
						value={[longitude, setLongitude]}
						id="longitude"
						type="numeric"
						submit={handleSubcribe}
					/>
				</View>

				<TouchableOpacity style={styles.Button} onPress={handleSubcribe}>
					<Text style={styles.ButtonText}>Salvar</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.HaveAccountText}>
				Já possui uma conta?
				<Text
					style={styles.HaveAccountButtonText}
					onPress={() =>
						navigation.navigate('Main', {
							latitude,
							longitude
						})
					}
				>
					{'  Entrar'}
				</Text>
			</Text>
		</ScrollView>
	);
}
