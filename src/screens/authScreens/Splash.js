import { Text } from 'react-native'
import React, { useEffect } from 'react'

import { StyledContainer, InnerContainer } from '../../Components/styles';
const Splash = ({ route, navigation }) => {


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Sliders")

        }, 1000)

    }, [])

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
