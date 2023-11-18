import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListFoodScreen from '../screen/ListFoodScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StackScreen from './StackScreen'

const Tab = createBottomTabNavigator()

const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    }
                    else if (route.name === 'ListFood') {
                        iconName = focused
                            ? 'layers-triple-outline'
                            : 'layers-triple-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                // tabBarShowLabel: false,
                headerShown: false

            })}
        >
            <Tab.Screen name='Home' component={StackScreen} />
            <Tab.Screen name='ListFood' component={ListFoodScreen} />
        </Tab.Navigator>
    )
}

export default BottomTab