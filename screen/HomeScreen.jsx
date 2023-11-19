import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Feather } from '@expo/vector-icons'


const HomeScreen = ({ navigation }) => {

    // customize header home screen
    const [criteria, setCriteria] = useState([]);
    const [newCriterion, setNewCriterion] = useState('');

    const addCriterion = () => {
        if (newCriterion.trim() !== '') {
            setCriteria([...criteria, { text: newCriterion, editMode: false }]);
            setNewCriterion('');
        }
    };

    const deleteCriterion = (index) => {
        const updatedCriteria = [...criteria];
        updatedCriteria.splice(index, 1);
        setCriteria(updatedCriteria);
    };

    const toggleEditMode = (index) => {
        const updatedCriteria = [...criteria];
        updatedCriteria[index].editMode = !updatedCriteria[index].editMode;
        setCriteria(updatedCriteria);
    };

    const updateCriterion = (index, newText) => {
        const updatedCriteria = [...criteria];
        updatedCriteria[index].text = newText;
        setCriteria(updatedCriteria);
    };

    const renderCriterion = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                {item.editMode ? (
                    <TextInput
                        style={{
                            flex: 1,
                            marginRight: 10,
                            padding: 5,
                            borderColor: 'gray',
                            borderWidth: 1
                        }}
                        value={item.text}
                        onChangeText={(text) => updateCriterion(index, text)}
                        autoFocus
                    />
                ) : (
                    <TouchableOpacity style={{
                        flex: 1,
                        borderColor: 'red',
                        borderWidth: 1,
                        borderRightWidth: 0,
                        padding: 10,
                        marginLeft: 10
                    }}
                        onPress={
                            () => toggleEditMode(index)}
                    >
                        <Text>{item.text}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        borderRightWidth: 0,
                        borderLeftWidth: 0,
                        padding: 10,
                        marginRight: 10
                    }}
                    onPress={() => deleteCriterion(index)}
                >
                    <Feather name="trash" size={20} color="red" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        padding: 10,
                        marginLeft: -20,
                        borderLeftWidth: 0,
                        marginRight: 20
                    }}
                    onPress={() => toggleEditMode(index)}
                >
                    <Feather name="edit" size={20} color="blue" />
                </TouchableOpacity>
            </View>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Twinkeu',
            headerLeft: () => (
                <View style={{
                    shadowColor: '#000',
                    // shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    backgroundColor: 'white'
                }}>

                    <Image source={require("../assets/home.png")} style={{
                        height: 55,
                        width: 70
                    }} />
                </View>
            )

        })
    });

    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Continent" value="Continent" />
                <Picker.Item label="Country" value="Country" />
                <Picker.Item label="Country" value="Country" />
            </Picker>
            <Text>Selected value: {selectedValue}</Text>
            <FlatList
                data={criteria}
                renderItem={renderCriterion}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TextInput
                    style={{ padding: 5, borderColor: 'gray', borderWidth: 1 }}
                    value={newCriterion}
                    onChangeText={setNewCriterion}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        opacity: 0.8,
                        marginBottom: '50%'
                    }}
                    onPress={addCriterion}
                >
                    <Text>+</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    containerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: '#C0C0C0',
        borderRadius: 7
    },
    textInput: {
        fontSize: 17,
    }
})