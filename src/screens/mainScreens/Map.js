import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geocoder from 'react-native-geocoding';
import { FlagsData } from './Countries';
import malaysiaFlag from '../../assets/images/malaysia.png';

Geocoder.init('AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8');


const Map = ({ navigation }) => {
    const [currentRegion, setCurrentRegion] = useState(null);
    const locationRef = useRef();
    const [stateChange, setStateChange] = useState(false)
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 100,
                    longitudeDelta: 100,
                });
            },
            error => console.error('Geolocation error:', error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        console.log('Clicked coordinates:', coordinate);
    };
    // console.log('flagdata', FlagsData[0].images)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0)' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 22, width: 30, marginHorizontal: 20, marginTop: 10 }}>
                    <AntDesign color={'black'} size={25} name='arrowleft' />
                    {/* <Image source={require(FlagsData[0].images)} /> */}
                </TouchableOpacity>
            </View>

            <MapView
                onPress={handleMapPress}
                ref={locationRef}
                style={{ flex: 1 }}
                mapType='terrain'
                region={currentRegion}
            >
                {FlagsData?.map((area, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: area?.latitude, longitude: area?.longitude }}
                        onPress={() => {
                            setStateChange(!stateChange)
                            navigation.navigate('Home', { country: area?.name, stateChange: stateChange });
                            console.log('area', area?.name);
                        }}
                        icon={area?.images}
                    // {/* <Image  source={area?.images} style={{height:10,width:10}}/> */}
                    // </Marker>
                    />
                ))}

            </MapView>
        </View>
    );
};

export default Map;

