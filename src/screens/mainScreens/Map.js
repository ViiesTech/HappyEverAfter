
import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Map = ({ navigation }) => {
    const [currentRegion, setCurrentRegion] = useState(null);
    const locationRef = useRef()


    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            },
            error => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    return (
        <View style={{ flex: 1}}>
            <View style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'rgba(0,0,0,0)' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 22, width: 30, marginHorizontal: 20, marginTop: 10, }}>
                    <AntDesign color={'black'} size={25} name='arrowleft' />
                </TouchableOpacity>


            </View>

            <MapView
                ref={locationRef}
                style={{ flex: 1 }}

                initialRegion={currentRegion}
            >

            </MapView>
        </View>
    );
};

export default Map;
