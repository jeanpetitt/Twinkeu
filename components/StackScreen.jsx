import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen'
import ListFoodScreen from '../screen/ListFoodScreen'
import FoodDetailScreen from '../screen/FoodDetailScreen'

const Stack = createNativeStackNavigator()

const StackScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Twinkeu' component={HomeScreen} />
            <Stack.Screen name='ListFoodstack' component={ListFoodScreen} />
            <Stack.Screen name='Details' component={FoodDetailScreen} />
        </Stack.Navigator>
    )
}

export default StackScreen