import React, { useContext, useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage
} from 'react-native';

import { ColorContext } from '../../functions/providers/ColorContext';
import { UserContext } from '../../functions/providers/UserContext';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../../styles/profileStyles';
import generalStyles from '../../styles/generalStyles';

const Section = ({
    section,
    placeholder,
    keyboardType,
    value,
    onChangeText
}) => {
    const { color } = useContext(ColorContext);

    useEffect(() => {
        if (section == 'Pin') {
            onChangeText(placeholder)
        }
    }, [])

    return (
        <View style={styles.row}>
            <View
                style={{
                    ...styles.section,
                    backgroundColor: color.primary,
                    ...generalStyles.shadow,
                    shadowColor: color.shadow
                }}
            >
                <Text style={{
                        ...styles.sectionHeader, 
                        color: color.primaryText
                    }}
                >
                    {section}
                </Text>
                <TextInput
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor={color.inactive}
                    secureTextEntry={section == 'Pin'}
                    style={{
                        fontSize: 20,
                        height: '100%',
                        marginLeft: 5,
                        color: color.primaryText
                    }}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const Circle = (props) => {
    return (
        <View
            style={{
                backgroundColor: props.backgroundColor,
                width: 70,
                height: 70,
                borderRadius: 100 / 2,
                marginRight: 5
            }}
        />
    );
};

export default function Settings(props) {
    const { navigation } = props;
    const { color, setName, colorSchemes } = useContext(ColorContext);
    const { user, userID, setUser, setUserID, updateUser } = useContext(UserContext);

    const [uname, setUname] = useState('');
    const [pin, setPin] = useState('');

    const data = [
        // TODO: ... colorSchemes //convert object to array, set = to data    
        { name: 'green', color: colorSchemes.green.background },
        { name: 'blue', color: colorSchemes.blue.background },
        { name: 'yellow', color: colorSchemes.yellow.background },
        { name: 'pink', color: colorSchemes.pink.background },
        { name: 'lavender', color: colorSchemes.lavender.background },
        { name: 'periwinkle', color: colorSchemes.periwinkle.background },
        { name: 'original', color: colorSchemes.original.background },
        { name: 'dark2', color: colorSchemes.dark2.background },
        { name: 'dark3', color: colorSchemes.dark3.background },
        { name: 'dark1', color: colorSchemes.dark1.background },
    ];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={[
                    { ...styles.container, backgroundColor: color.background }
                ]}
            >
                <Section
                    section={"Name"}
                    placeholder={user.name}
                    keyboardType="default"
                    value={uname}
                    onChangeText={val => {
                        setUname(val)
                        updateUser(userID, { name: val })
                    }}
                />
                <Section
                    section={'Number'}
                    placeholder={
                        user.number ? user.number.toString() : user.number
                    }
                    keyboardType="phone-pad"
                />
                <Section
                    section={'Pin'}
                    placeholder={user.pin ? user.pin.toString() : user.pin}
                    keyboardType="number-pad"
                    value={pin}
                    onChangeText={val => {
                        setPin(val)
                        updateUser(userID, { pin: val })
                    }}
                />
                <View
                    style={{ 
                        ...styles.rowColor,                     
                        backgroundColor: color.primary,
                        ...generalStyles.shadow,
                        shadowColor: color.shadow 
                    }}
                >                    
                    <Text 
                        style={{
                            ...styles.colorHeader,
                            color: color.primaryText
                        }}
                    >
                        Color
                    </Text>
                    <FlatList
                        contentContainerStyle={styles.colorsRectangle}
                        data={data}
                        horizontal
                        persistentScrollbar
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setName(item.name);
                                    }}
                                >
                                    <Circle backgroundColor={item.color} />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={async () => {
                        // ugly solution to logout / rerender
                        setUser({});
                        setUserID('');
                        await AsyncStorage.clear();
                        navigation.push('LoadingScreen', {
                            update: Math.random()
                        });
                    }}
                    style={styles.logout}
                >
                    <Text style={{ ...styles.logoutText, color: color.primaryText }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
