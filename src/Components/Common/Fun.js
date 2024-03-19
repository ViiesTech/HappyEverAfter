import { View, Text } from 'react-native'
import React from 'react'

export const HandleLike=(props)=>{
    firestore()
            .collection('Users')
            .doc(UID)
            .update({
                like:firebase.firestore.FieldValue.arrayUnion(_uid)
            }).then(res=>{
                console.log("Response",res)
                dispatch(AddingLikeUid(_uid))
                // querySnapshot.forEach(documentSnapshot => {
                //     // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                //     // temp.push(documentSnapshot.data())
                // });
            })
}