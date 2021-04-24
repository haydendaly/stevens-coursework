import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, FlatList, View, Button } from 'react-native';
import { FontAwesome5 as FA5Icon } from '@expo/vector-icons/';
import { FontAwesome as Icon } from "@expo/vector-icons/";
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

    if (props.style === 'top') {
        style.push(styles.entryTop);
    } else if (props.style === 'bottom') {
        style.push({ ...styles.entryBottom, borderBottomWidth: 0 });
    } else if (props.style === 'both') {
        style.push(styles.entryTop);
        style.push(styles.entryBottom);
    }

    let description;
    if (props.private === true) {
        description = 'This journal is private.';
    } else if (props.body.length <= 40) {
        description = props.body;
    } else {
        description = props.body.slice(0, 40) + '...';
    }

    let title = props.title;
    if (title.length > 40) {
        title = props.title.slice(0, 40) + '...';
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
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <Text style={{
                            ...styles.entryTitle,
                            color: color.primaryText
                        }}>
                            {title}
                        </Text>
                        {props.private && 
                            <View style={{marginLeft: 5}}>
                                <Icon name="lock" color={color.inactive} size={16} />
                            </View>
                        }
                        {data.starred && 
                            <View style={{marginLeft: 5}}>
                                <Icon name="star" color={color.inactive} size={16} />
                            </View>
                        }
                    </View>
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
    journals.sort((a,b) => {
        if ( dayjs(a.timeCreated).isBefore( dayjs(b.timeCreated) ))   {
            return 1;
        }
        else {
            return -1;
        }
    });
    const { color } = useContext(ColorContext);

    let data = [];

    for (let i = 0; i < journals.length; i++) {
        if (
            data.length === 0 ||
            dayjs(data[data.length - 1][0].timeCreated).format('MMDDYY') !==
                dayjs(journals[i].timeCreated).format('MMDDYY')
        ) {
            data.push([journals[i]]);
        } else {
            data[data.length - 1].push(journals[i]);
        }
    }

    for (list of data) {
        if (list.length === 1) {
            list[0].style = 'both';
        } else {
            list[0].style = 'top';
            list[list.length-1].style = 'bottom';
        }
    }

    return (
        <>
            {data.length === 0 ? (
                <View>
                    <Text style={{ color: color.primaryText }}>No journals yet, add one below!</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    style={styles.topList}
                    contentContainerStyle={styles.entryList}
                    keyExtractor={(item) => item[0].timeCreated + item[0].id}
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
                                    {dayjs(item[0].timeCreated).format('dddd')}{'  '}
                                </Text>
                                <Text
                                    style={{
                                        color: color.inactive,
                                        fontSize: 14
                                    }}
                                >
                                    {dayjs(item[0].timeCreated).format('MM/DD/YY')}
                                </Text>
                            </Text>
                            <FlatList
                                style={{
                                    ...generalStyles.shadow,
                                    shadowColor: color.shadow
                                }}
                                data={item}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Entry
                                        title={item.title}
                                        body={item.body}
                                        private={item.private}
                                        navigation={props.navigation}
                                        style={item.style}
                                        data={item}
                                    />
                                )}
                            />
                        </View>
                    )}
                />
            )}
        </>
    );
}

export default JournalList;
