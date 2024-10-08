import { View, Text, SafeAreaView, RefreshControl, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import axios from "axios";
import fetchFoodGroup from '../server/api';

//Refresh control
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ListfoodGroupcreen = ({ navigation }) => {

    // const data = fetchFoodGroup()
    const [foodGroup, setFoodGroup] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [key, setKey] = useState(0)
    const mounted = useRef()


    //  fetch food group
    const fetchData = async () => {
        setIsLoading(true);
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
            data = response.data.results.bindings
            console.log('size of foodGroup', data.length)
            setTimeout(() => {
                setIsLoading(false);
                setFoodGroup(data);
                setMasterData(data);
                // if (data.length === 0) {
                //     setFoodGroup([
                //         { 'label': 'Not available food group', 'value': '1' }
                //     ])
                // } else {

                //     const newDataCountry = foodGroup.map(item => (
                //         {
                //             'label': item.food_name.value,
                //             'value': item.food_name.value,
                //             'uri': item.id_food.value,
                //         }

                //     ))

                //     setFoodGroup(newDataCountry)
                //     console.log('success get foodGroup with list');
                // }

            }, 2000);



        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(search)
        navigation.setOptions({
            title: 'Food Group',
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
    }, [])


    //Refresh control
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setKey((prevKey) => prevKey + 1)
        wait(2000).then(() => setRefreshing(false))
    }, [foodGroup])

    const handleFoodPress = (food) => {
        navigation.navigate('DetailsFoodGroup', { food });
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.food_name.value ? item.food_name.value.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFoodGroup(newData);
            setSearch(text)
            console.log(search)
        } else {
            setFoodGroup(masterData);
            setSearch(text);
            console.log(search);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleFoodPress(item)}>

                <View style={styles.itemStyle}>
                    {/* <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 10 }} /> */}
                    <Text style={{ margin: 20, color: "#FF8F8F", textAlign: 'center' }}>{item.food_name.value.toUpperCase()}</Text>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.textInput}
                        value={search}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                        placeholder='Search a food group'
                    />
                    <AntDesign name='search1' color='red' size={24} />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF8F8F" style={{ margin: '50%' }} />) :
                    (
                        <FlatList
                            data={foodGroup}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ItemView}
                            refreshControl={
                                <RefreshControl
                                    color="#FF8F8F"
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    )
                }

            </View>
        </SafeAreaView>
    )
}

export default ListfoodGroupcreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 5,
        backgroundColor: '#f9c2ff',
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 50,
        alignItems: 'center'
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
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white',
    },
    textInput: {
        fontSize: 17,
    }
})

