import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const Button = ({ title, icon, onPress, color }) => {
    let textColor, backgroundColor
    color == 'blue' ? (textColor = '#fff', backgroundColor = '#0174BE') : (textColor = '#5B005C', backgroundColor = '#fff')
    return (
        <View style={{
            marginVertical: 20,
            width: '80%',
        }}>
            <Icon.Button
                name={icon}
                color={textColor}
                backgroundColor={backgroundColor}
                style={{ marginVertical: 1, padding: 15 }}
                onPress={onPress}
            >
                <View style={{ marginLeft: '30%' }}>
                    <Text style={[styles.textBold, { color: `${textColor}` }]}>{title}</Text>
                </View>
            </Icon.Button>
        </View>
    )
}

export default Button;
const styles = StyleSheet.create({
    textBold: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
})