import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, FlatList, View, Button } from 'react-native';
import { FontAwesome5 as FA5Icon } from '@expo/vector-icons/';
import { TextInput } from 'react-native-gesture-handler';

import { ColorContext } from '../../functions/providers/ColorContext';
import { UserContext } from '../../functions/providers/UserContext';
import generalStyles from '../../styles/generalStyles';
import styles from '../../styles/journalListStyles';
import Modal from 'react-native-modal';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function Entry(props) {
    const { color } = useContext(ColorContext);
    const { data } = props;
    const { pin } = useContext(UserContext);
    let style = [
        {
            ...styles.entry,
            backgroundColor: color.primary,
            borderColor: color.inactive
        }
    ];

    style.push(styles.entryTop);
    style.push(styles.entryBottom);

    let description;
    if (props.private === true) {
        description = 'This journal is private.';
    } else if (props.body.length <= 40) {
        description = props.body;
    } else {
        description = props.body.slice(0, 40) + '...';
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [inputPin, setPIN] = useState('');
    const [errorText, setError] = useState('');

    useEffect(() => {
        setPIN('');
    }, [isModalVisible]);

    function checkPIN() {
        if (inputPin == pin) {
            setError('');
            toggleModal();
            props.navigation.navigate('Journal', { data: { ...data } });
        } else {
            setError('Invalid PIN entered.');
        }
    }

    return (
        <View
            style={{
                ...generalStyles.shadow,
                shadowColor: color.shadow
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    if (props.private) {
                        toggleModal();
                    } else {
                        props.navigation.navigate('Journal', {
                            data: { ...data }
                        });
                    }
                }}
                style={[style, styles.entryContent]}
            >
                <View>
                    <Text
                        style={{
                            ...styles.entryTitle,
                            color: color.primaryText
                        }}
                    >
                        {props.title}
                    </Text>
                    <Text style={{ color: color.inactive }}>{description}</Text>
                </View>
                <FA5Icon
                    name="chevron-right"
                    color={color.inactive}
                    size={36}
                />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={styles.container}>
                    <Text
                        style={{
                            marginBottom: 10,
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                    >
                        Enter PIN
                    </Text>
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        {errorText}
                    </Text>
                    <TextInput
                        numeric
                        keyboardType="numeric"
                        style={{
                            fontSize: 20,
                            width: 150,
                            height: 50,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: color.primaryText,
                            backgroundColor: color.backgroundColor,
                            justifyContent: 'center',
                            marginBottom: 10,
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                        value={inputPin}
                        onChangeText={(val) => setPIN(val)}
                        autoFocus
                        secureTextEntry
                    />
                    <Button title="Ok" onPress={checkPIN} />
                    <Button title="Cancel" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}

function JournalList(props) {
    let journals = props.data;
    const { color } = useContext(ColorContext);

    return (
        <>
            {journals.length === 0 ? (
                <View>
                    <Text>No journals yet, add one below!</Text>
                </View>
            ) : (
                <FlatList
                    data={journals}
                    style={styles.topList}
                    contentContainerStyle={styles.entryList}
                    keyExtractor={(item) => item.timeCreated + item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text
                                style={{
                                    margin: 4,
                                    fontFamily: 'medium',
                                    color: color.primaryText,
                                    fontSize: 16
                                }}
                            >
                                <Text>
                                    {dayjs(item.timeCreated).format('dddd')}{'    '}
                                </Text>
                                <Text
                                    style={{
                                        color: color.inactive,
                                        fontSize: 14
                                    }}
                                >
                                    {dayjs(item.timeCreated).format('MM/DD/YY')}
                                </Text>
                            </Text>
                            <Entry
                                title={item.title}
                                body={item.body}
                                private={item.private}
                                navigation={props.navigation}
                                style={item.style}
                                data={item}
                            />
                        </View>
                    )}
                />
            )}
        </>
    );
}

export default JournalList;
