import { View, Text,SafeAreaView,style,TextInput} from 'react-native'
import React,{useState} from 'react'
import { Provider } from 'react-native-paper'
import {DropDown} from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
const Dropdown = () => {
    const [showDropDown, setShowDropDown] = useState(true);
    console.log(showDropDown)
    const [Selectlist1, setSelectlist1] = useState('');
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const list = [
        {
            label: 'a. 2-2-1',
            value: '1',
        },
        {
            label: 'a. 2-2-2',
            value: '2',
        },
        {
            label: 'a. 2-2-3',
            value: '3',
        },
        {
            label: 'a. 2-2-4',
            value: '4',
        },
        {
            label: 'a. 2-2-5',
            value: '5',
        },
        {
            label: 'a. 2-2-6',
            value: '6',
        },
        {
            label: 'a. 2-2-7',
            value: '7',
        },
        {
            label: 'a. 2-2-8',
            value: '8',
        },
        {
            label: 'a. 2-2-9',
            value: '9',
        },
    ];
    return (
        <Provider>
            <SafeAreaView>
                <DropDown
                    label={"a. 2-2-3"}
                    mode={"outlined"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={Selectlist1}
                    setValue={setSelectlist1}
                    list={list}
                    inputProps={{
                        right: <TextInput.Icon name={'chevron-down'} size={15} />,
                    }}
                />
            </SafeAreaView>
        </Provider>
    )
}

export default Dropdown