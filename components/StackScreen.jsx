import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen'
import ListFoodScreen from '../screen/ListFoodScreen'
import FoodDetailScreen from '../screen/FoodDetailScreen'
import BottomTab from './BottomTab'

const Stack = createNativeStackNavigator()

const StackScreen = () => {
    return (
        <Stack.Navigator

        >
            {/* <Stack.Screen name='Twinkeu' component={HomeScreen} /> */}
            < Stack.Screen name='ListFoo' component={BottomTab} options={{ headerShown: false }} />
            {/* <Stack.Screen name='ListFoodstack' component={ListFoodScreen} /> */}
            <Stack.Screen name='Details' component={FoodDetailScreen} />
            <Stack.Group
                screenOptions={({ navigation }) => ({
                    presentation: 'modal',
                    headerLeft: () => <CancelButton onPress={navigation.goBack} />,
                })}
            >
            </Stack.Group>
        </Stack.Navigator >
    )
}

export default StackScreen