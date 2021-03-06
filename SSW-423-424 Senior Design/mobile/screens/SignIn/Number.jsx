import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons/';

import { UserContext } from '../../functions/providers/UserContext';
import { ColorContext } from '../../functions/providers/ColorContext';
import styles from '../../styles/signInStyles';

export default function Number(props) {
    const { navigation } = props;
    const { color } = useContext(ColorContext);
    const { newUser, setNewUser, auth } = useContext(UserContext);
    const [number, setNumber] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={{ ...styles.container, backgroundColor: color.primary }}
            >
                <Text
                    style={{ ...styles.headerText, color: color.primaryText }}
                >
                    What's your number?
                </Text>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        color: color.primaryText
                    }}
                >
                    We just need your number for verification and won't spam you
                    or sell your data.
                </Text>
                <TextInput
                    placeholder="(123)-456-7890"
                    placeholderTextColor={color.inactive}
                    keyboardType="phone-pad"
                    style={{ fontSize: 20 }}
                    onChangeText={setNumber}
                />
                <TouchableOpacity
                    style={[
                        { ...styles.button, backgroundColor: color.highlight },
                        number.length > 9
                            ? {}
                            : { backgroundColor: color.inactive }
                    ]}
                    onPress={() => {
                        if (number.length > 9) {
                            setNewUser({ ...newUser, number });
                            auth(number);
                            navigation.navigate('Verify');
                        }
                    }}
                >
                    <Icon
                        name="chevron-right"
                        color={color.primary}
                        size={28}
                        style={{ marginLeft: 3, marginTop: 2 }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
