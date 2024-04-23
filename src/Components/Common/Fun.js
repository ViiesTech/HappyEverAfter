export const HandleLike = (props) => {
    firestore()
        .collection('Users')
        .doc(UID)
        .update({
            like: firebase.firestore.FieldValue.arrayUnion(_uid)
        }).then(res => {
            console.log("Response", res)
            dispatch(AddingLikeUid(_uid))
        })
}