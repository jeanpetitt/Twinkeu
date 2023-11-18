import { View, Text, SafeAreaView, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from "axios";


const ListFoodScreen = ({ navigation }) => {

    // customize header home screen


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTile: 'Food List',
            headerLeft: () => (
                <Image source={{ uri: "../asstes/icon.png" }} />
            ),
            // headerRight: ({ color }) => (
            //     <Pressable style={{ flexDirection: 'column', marginTop: 10 }}>
            //         <MaterialCommunityIcons
            //             name='person-circle-outline'
            //             color={color}
            //             style={styles.headerHomeRight}
            //         />
            //         <Text style={{ textAlign: 'center', fontSize: 10, marginLeft: -50 }}>Login</Text>
            //     </Pressable>

            // )

        })
    });

    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')

    const [foods, setFood] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const endpointUrl = 'https://orkg.org/triplestore';
            const sparqlQuery = `
            SELECT DISTINCT ?id_food ?food_name
            WHERE {
            ?id_food rdf:type <http://orkg.org/orkg/class/C34000> .
            ?id_food rdfs:label ?food_name .
            }
                    `;

            try {
                const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
                const headers = { 'Accept': 'application/sparql-results+json' };

                const response = await axios.get(fullUrl, { headers });
                setFood(response.data.results.bindings);
                setMasterData(response.data.results.bindings);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
        console.log(search)
        fetchData();
    }, [])

    const handleFoodPress = (food) => {
        navigation.navigate('Details', { food });
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.food_name.value ? item.food_name.value.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFood(newData);
            setSearch(text)
            console.log(search)
        } else {
            setFood(masterData);
            setSearch(text);
            console.log(search);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleFoodPress(item)}>

                <View style={styles.itemStyle}>
                    {/* <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 10 }} /> */}
                    <Text style={{ margin: 20 }}>{item.food_name.value.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
            />

        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.textInput}
                        value={search}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                        placeholder='Search Food'
                    />
                    <AntDesign name='search1' color='red' size={24} />
                </View>
                <FlatList
                    data={foods}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    )
}

export default ListFoodScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 10,
        backgroundColor: '#f9c2ff',
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 10,
        borderColor: '#009688',
        backgroundColor: 'white',
    },
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

