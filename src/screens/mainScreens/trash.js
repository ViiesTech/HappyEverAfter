<Modal style={{ height: '100%', position: 'absolute', zIndex: 100, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }} backdropOpacity={0} isVisible={modalVisible}>
<View style={{ backgroundColor: 'white', zIndex: 100, padding: 40, borderRadius: 10, alignItems: 'center', gap: 20 }}>
    <TouchableOpacity onPress={() => {
        console.log('hello')
        setModalVisible(false)
    }} style={{ position: 'absolute', alignSelf: 'flex-end', padding: 10 }}>
        <MaterialIcons name='cancel' size={25} />
    </TouchableOpacity>
    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>Want To Buy Subscription?</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'rgb(0, 123, 255)', padding: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 18 }}>No</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
            navigation.navigate('Subscription')
            setModalVisible(false)
        }} style={{ backgroundColor: 'rgb(40, 167, 69)', padding: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}><Text style={{ color: 'white', fontSize: 18 }}>Yes</Text></TouchableOpacity>
    </View>
</View>
</Modal>