import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS } from '../../Components/utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../assets/images/Appassets';

const slides = [
    {
        key: 1,
        title: 'The Beginning Of Forever.',
        text: 'Embark on a journey of love and connection as you navigate through our dating app. With each swipe, discover the potential for romance and meaningful connections.',
        image: Images.slider1,
        next: false
    },
    {
        key: 2,
        title: 'Discover your hearts desire with each slide, as love awaits just a swipe away.',
        text: 'Welcome to our dating app, where every swipe holds the promise of a new beginning. Explore endless possibilities as you connect with like-minded souls searching for love.',
        image: Images.slider2,
        next: false
    },
    {
        key: 3,
        title: 'Find love in every swipe - where every connection is a chance at romance.',
        text: "Enter a world of endless possibilities, where every swipe brings you closer to the romance you seek.",
        image: Images.slider3,
        next: true
    }
];

const Slider = ({ navigation }) => {
    const [showRealApp, setShowRealApp] = useState(false);
    const sliderRef = useRef(null);

    const _renderItem = ({ item }) => {
        return (
            <ImageBackground source={item.image} style={styles.slide}>
                <View style={{ flex: 0.5, justifyContent: 'flex-end', padding: 20 }}>
                    <Text style={{ fontSize: 25, color: COLORS.white, width: '83%' }} >{item.title}</Text>
                    <Text style={{ fontSize: 16, color: COLORS.white, marginTop: 20 }}>{item.text}</Text>
                    {item.next ? (

                        <TouchableOpacity style={{ backgroundColor: 'transparent', justifyContent: 'center', borderRadius: 10 }} onPress={() => {
                            sliderRef.current?.goToSlide(slides.length)
                            navigation.navigate('Login')
                        }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={{ borderRadius: 50, marginTop: 20, height: 60, justifyContent: 'center' }}>
                                <Text style={[styles.next, { textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }]}>Continue</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    ) :

                        <TouchableOpacity style={{ backgroundColor: 'transparent', justifyContent: 'center', borderRadius: 10 }} onPress={() => {
                            sliderRef.current?.goToSlide(slides.indexOf(item) + 1);
                        }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={{ borderRadius: 50, marginTop: 20, height: 60, justifyContent: 'center' }}>
                                <Text style={[styles.next, { textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }]}>Continue</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    }
                </View>
            </ImageBackground>
        );
    }

    const _renderPagination = () => null;

    const _onDone = () => {
        setShowRealApp(true);
    }

    if (showRealApp) {
        return null;
    } else {
        return (
            <AppIntroSlider
                ref={sliderRef}
                renderItem={_renderItem}
                renderPagination={_renderPagination}
                data={slides}
                onDone={_onDone}
            />
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
    },
    continue: {
        height: 55,
        width: 55,
        borderRadius: 27,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2.5,
        alignSelf: 'flex-end'
    },
    nextButton: {
        marginTop: 15,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderLeftWidth: 2,
        borderTopWidth: 2
    }
});

export default Slider;
