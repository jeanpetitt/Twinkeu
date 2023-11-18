import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Baner from '../components/Baner'
import FoodTypes from '../components/FoodTypes'
import QuickFood from '../components/QuickFood'

const HomeScreen = ({ navigation }) => {

    // customize header home screen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTile: 'Twinkeu',
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

    const [filterData, setfilterData] = useState([])
    const [masterData, setmasterData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchPost()

        return () => {

        }
    }, [])

    const fetchPost = () => {


        const apiURL = 'https://jsonplaceholder.typicode.com/posts';

        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setfilterData(responseJson);
                setmasterData(responseJson)
            }).catch((error) => {
                console.log(error);
            })
    }

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterData(newData);
            setSearch(text)
        } else {
            setfilterData(masterData);
            setSearch(text)
        }
    }

    const ItemView = ({ item }) => {
        return (
            <Text style={styles.itemStyle}>
                {item.id}{'. '}{item.title.toUpperCase()}
            </Text>
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
            {/* Search Bar */}
            <View style={styles.containerSearch}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Search Food'
                />
                <AntDesign name='search1' color='red' size={24} />
            </View>

            {/* Image Baner Component */}
            <Baner />

            {/* Food Item */}
            {/* <FoodTypes /> */}

            {/* Quick Food Component*/}
            <QuickFood navigation={navigation} />

            {/* filter Button */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Pressable style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    width: 90
                }}>
                    <Text style={{ marginRight: 6 }}>Filter</Text>
                    <Ionicons name='filter' size={24} color="black" />
                </Pressable>

                <Pressable style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                }}>
                    <Text>Sort By Rating</Text>
                </Pressable>
                <Pressable style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center'
                }}>
                    <Text>Sort By Price</Text>
                </Pressable>
            </View> */}
        </SafeAreaView>
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