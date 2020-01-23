import React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import {
	requestPermissionsAsync,
	getCurrentPositionAsync
} from 'expo-location';

import api from '../../service/api';
import styles from './styles';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentRegion: null,
			devs: [],
			techs: ''
		};

		this.handledRegionChanged = this.handledRegionChanged.bind(this);
		this.loadDevs = this.loadDevs.bind(this);
	}

	async componentDidMount() {
		const { granted } = await requestPermissionsAsync();

		if (granted) {
			const { coords } = await getCurrentPositionAsync({
				enableHighAccuracy: true
			});

			const { latitude, longitude } = coords;

			this.setState({
				currentRegion: {
					latitude,
					longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}
			});
		}
	}

	async loadDevs() {
		const { currentRegion, techs } = this.state;

		const { latitude, longitude } = currentRegion;

		const res = await api.get('/search', {
			params: {
				latitude,
				longitude,
				techs
			}
		});

		this.setState({ devs: res.data });
	}

	async handledRegionChanged(region) {
		this.setState({ currentRegion: region });
	}

	render() {
		const { currentRegion, devs, techs } = this.state;
		const { navigation } = this.props;

		return (
			<>
				<MapView
					onRegionChangeComplete={this.handledRegionChanged}
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
						onChangeText={text => this.setState({ techs: text })}
					/>

					<TouchableOpacity onPress={this.loadDevs} style={styles.loadButton}>
						<MaterialIcons name="my-location" size={20} color="#FFF" />
					</TouchableOpacity>
				</View>
			</>
		);
	}
}

export default Main;
