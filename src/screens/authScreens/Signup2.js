import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
// import { StyledContainer, Colors, TextLabel, Card, TextSmall, StyledTextInput, StyledButtonTouch, SmallTextInput, HeaderContainer, ScreenTitle, InputStyledTextField } from '../Components/styles'
const { primary, purple, secondary } = Colors;
import { StyledContainer, Colors, TextLabel, Card, TextSmall, StyledTextInput, StyledButtonTouch, SmallTextInput, HeaderContainer, ScreenTitle, InputStyledTextField } from '../../Components/styles';
import {
    Provider,
    ThemeProvider,
} from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DatePicker from 'react-native-date-picker'
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
const SignUp2 = ({ route, navigation }) => {
    const { email, password } = route.params.userData;
    console.log('email,password', email, password)
    const [showDropDown, setShowDropDown] = useState(false);
    const [Name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [occupation, setOccupation] = useState('')
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [gender, setGender] = useState('male');
    const [country, setCountry] = useState(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [profileImage, setProfileImage] = useState()
    console.log(date)

    const data = [1]
    const [countries, setCountries] = useState([
        {
            label: "USA",
            value: "USA",
        },
        {
            label: "Canada",
            value: "Canada",
        },
        {
            label: "Germany",
            value: "Germany",
        },
        {
            label: "UK",
            value: "UK",
        },
    ])

    const toggleScrollViewScrolling = (enabled) => {
        setScrollEnabled(enabled);
    };

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    }

    const getAge = (birthday) => { // birthday is a date
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    const selectAnImage = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // setImageType(image)
            console.log('image', image)
            setProfileImage(image);
        });

    }
    const HandleSignUp = () => {

        const userData = {
            email: email,
            password: password,
            name: Name,
            pic: profileImage ? JSON.stringify(profileImage) : null,
            dob: date ? JSON.stringify(date) : null,
            country: country,
            gender: gender,
            phone: phone,
            occupation: occupation,
        };

        if (profileImage && Name && country && phone && occupation) {
            navigation.navigate("Signup3", { userData: userData })
        } else {
            return showToast('error', 'Plz Fill Out The Required Fields')
        }

    }
    const renderItem = () => {
        return (


            <View style={{ flex: 1 }}>
                <Provider>
                    <ThemeProvider >
                        <StyledContainer>
                            <View style={{ paddingLeft: 15, alignSelf: 'flex-start' }}>
                                <Ionicons name='arrow-back' size={26} color="white" onPress={() => navigation.goBack()} />
                            </View>
                            <Card style={styles.input}>
                                <TextLabel>Select a Profile Picture</TextLabel>
                                <View style={{ width: wp('85%'), height: hp('25%'), borderRadius: 8, overflow: 'hidden' }}>
                                    {profileImage ? (
                                        <TouchableOpacity onPress={selectAnImage}>
                                            <Image source={{ uri: profileImage.path }} style={{ width: '100%', height: '100%' }} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={selectAnImage} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'lightgrey' }}>
                                            <Fontisto name='picture' color={'black'} size={140} />
                                        </TouchableOpacity>

                                    )}
                                </View>
                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Enter your name</TextLabel>
                                <TextInput onChangeText={text => setName(text)} value={Name} placeholder="Name" style={{ height: 60, width: '100%', borderColor: 'black', backgroundColor: 'white', color: 'black', borderRadius: 10, padding: 10 }} />

                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Date of birth</TextLabel>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <InputStyledTextField>{date.getMonth() + 1}</InputStyledTextField>
                                    <InputStyledTextField>{date.getDate()}</InputStyledTextField>
                                    <InputStyledTextField>{date.getFullYear()}</InputStyledTextField>
                                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateOver} />
                                </View>
                            </Card>


                            <Card style={styles.input}>
                                <TextLabel>Choose your country</TextLabel>
                                {
                                    console.log("open2", open2)
                                }
                                <View style={{ width: wp('90%'), justifyContent: 'center', borderRadius: 10, height: open2 == true ? 150 : 50, justifyContent:'flex-start', }}>
                                    <DropDownPicker
                                        maxHeight={100}
                                        // onOpen={() => toggleScrollViewScrolling(false)} // Disable ScrollView scrolling when DropDownPicker is opened
                                        // onClose={() => toggleScrollViewScrolling(true)}
                                        open={open2}
                                        nestedScrollEnabled={true}
                                        dropDownDirection='down'
                                        value={country}
                                        items={countries}
                                        setOpen={setOpen2}
                                        setValue={setCountry}
                                        setItems={setCountries}
                                    />
                                </View>
                            </Card>
                            <Card style={styles.switcher}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={male ? ['orange', 'red',] : ['#ffffff', '#ffffff']} style={[styles.male, styles.buttonShadow, { borderRadius: male ? 100 : 10 }]}>
                                    <StyledButtonTouch style={{ width: wp('42%'), backgroundColor: 'transparent' }} onPress={() => { setFemale(false), setMale(true), setGender('male') }}>
                                        <TextSmall style={{ color: male ? '#ffffff' : '#F2B3B7', fontWeight: 'bold' }}>Male</TextSmall>
                                    </StyledButtonTouch>
                                </LinearGradient>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={female ? ['red', 'orange',] : ['#ffffff', '#ffffff']} style={[styles.female, styles.buttonShadow, { borderRadius: female ? 100 : 10 }]}>
                                    <StyledButtonTouch style={{ width: wp('42%'), backgroundColor: 'transparent' }} onPress={() => { setFemale(true), setMale(false), setGender("female") }}>
                                        <TextSmall style={{ color: female ? '#ffffff' : '#F2B3B7', fontWeight: 'bold' }}>Female</TextSmall>
                                    </StyledButtonTouch>
                                </LinearGradient>
                            </Card>
                            {/* <Card style={styles.input}>
                    <TextLabel>Write about yourself</TextLabel>
                    <View style={{ width: wp('90%'), alignSelf: 'center', paddingHorizontal: 5, marginTop: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}>
                        <TextInput value={bio} multiline={true} numberOfLines={6} textAlignVertical={'top'} placeholder={"Write your bio here...."} placeholderTextColor={'grey'} onChangeText={(changedText) => setBio(changedText)} style={{ fontSize: 16, color: 'black' }} />
                    </View>

                </Card> */}

                            <Card style={styles.input}>
                                <TextLabel>Enter your Phone No </TextLabel>
                                <TextInput onChangeText={text => setPhone(text)} value={phone} placeholder="Phone Number" style={{ height: 60, width: '100%', borderColor: 'black', backgroundColor: 'white', color: 'black', borderRadius: 10, padding: 10 }} />
                            </Card>

                            <Card style={styles.input}>
                                <TextLabel>Enter your occupation</TextLabel>
                                <TextInput onChangeText={text => setOccupation(text)} value={occupation} placeholder="Occupation" style={{ height: 60, width: '100%', borderColor: 'black', backgroundColor: 'white', color: 'black', borderRadius: 10, padding: 10 }} />
                            </Card>


                            <Card style={{ paddingVertical: hp('5%') }}>
                                <StyledButtonTouch style={{ backgroundColor: 'transparent' }} onPress={() => { HandleSignUp() }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                                        <TextSmall style={styles.next}>Continue</TextSmall>
                                    </LinearGradient>
                                </StyledButtonTouch>
                            </Card>
                        </StyledContainer>
                    </ThemeProvider>
                </Provider >
                <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
        )
    }
    console.log('occupation', occupation)
    return (
        <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/login.png')}>
            {/* <ScrollView keyboardShouldPersistTaps='always' scrollEnabled={scrollEnabled} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
              
            </ScrollView> */}
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={data} // Pass your data array here
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} // Provide a unique key extractor function
            />
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowRadius: 10,
        shadowOffset: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    },
    card: {
        flexDirection: 'row',
        width: wp('90%'),
        top: 10,
    },
    switcher: {
        flexDirection: 'row',
        width: wp('90%'),
        paddingTop: hp('5%'),
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: wp('90%'),
        height: 60,
        justifyContent: 'center',
        backgroundColor: 'rgba(85,22,165,0.5)',
        borderRadius: 50
    },
    male: {
        width: wp('42%'),
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: secondary
    },
    female: {
        width: wp('42%'),
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: secondary
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: wp('45%')
    },
    input: {
        marginTop: 20
    },
    inputBorder: {
        borderColor: purple
    },
    errorView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        height: hp('15%'),
        marginTop: 30,
    },
    error: {
        justifyContent: 'flex-start',
    },
    next: {
        fontSize: 20,
        color: primary,
        fontWeight: 'bold'
    },
    dateOver: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})
export default SignUp2