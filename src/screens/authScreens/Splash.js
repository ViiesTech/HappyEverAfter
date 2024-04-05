import { View, Image, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Card } from 'react-native-paper';
import { StyledContainer, InnerContainer } from '../../Components/styles';
const Splash = ({ route, navigation }) => {
    // const [IsFirstTimeLogin, setIsFirstTimeLogin] = useState(true);
    // const rotateValue = new Animated.Value(0);

    // useEffect(() => {
    //     Animated.timing(rotateValue, {
    //         toValue: 1,
    //         duration: 4000,
    //         easing: Easing.linear,
    //         useNativeDriver: true
    //     }).start();
    // }, []);


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Sliders")

        }, 1000)

    }, [])
    // const spin = rotateValue.interpolate({
    //     inputRange: [0, 2],
    //     outputRange: ['0deg', '720deg']
    // });

    return (
        <StyledContainer>
            <InnerContainer>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 40 }}>
                    Happy <Text style={{ color: 'red' }}>Ever After</Text>
                </Text>
            </InnerContainer>
        </StyledContainer>
    );
}

export default Splash;
