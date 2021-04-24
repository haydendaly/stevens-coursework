import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';

import { FontAwesome as Icon } from '@expo/vector-icons/';
import Slider from 'react-native-slider';

import styles from "../../styles/trackStyles";
import { ColorContext } from '../../functions/providers/ColorContext';
import { UserContext } from '../../functions/providers/UserContext';

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const now = dayjs().local().format('DDMMYYYY');

// console.log('Current timestamp: ', now);

export default function Track(props) {

    const { navigation } = props;
    const { color } = useContext(ColorContext);
    const { userID, moods, createMood, updateMood } = useContext(UserContext);

    // console.log('Existing timestamp:', dayjs(mood.moodID.timeCreated).format('DDMMYYYY'));

    // .filter or .reduce for mood array, for loop in one line

    const [created, setCreated] = useState(false);
    const [anxiety, setAnxiety] = useState(5);
    const [anxietyView, setAnxietyView] = useState(.5);
    const [energy, setEnergy] = useState(5);
    const [energyView, setEnergyView] = useState(.5);
    const [activity, setActivity] = useState(5);
    const [activityView, setActivityView] = useState(.5);
    const [stress, setStress] = useState(5);
    const [stressView, setStressView] = useState(.5);

    useEffect(() => {
        if ( moods.length != 0 && now == dayjs(moods[moods.length-1].timeCreated).format('DDMMYYYY') ) {
            setCreated(true);
            setAnxiety(moods[moods.length-1].anxiety);
            setAnxietyView(moods[moods.length-1].anxiety / 10);
            setEnergy(moods[moods.length-1].energy);
            setEnergyView(moods[moods.length-1].energy / 10);
            setActivity(moods[moods.length-1].activity);
            setActivityView(moods[moods.length-1].activity / 10);
            setStress(moods[moods.length-1].stress);
            setStressView(moods[moods.length-1].stress / 10);
        }
    }, [])

    const submit = () => {

        if (created) {
            updateMood(userID, moods[moods.length-1].id, anxiety, energy, activity, stress, () => {
            });
        }

        else {
            createMood(userID, anxiety, energy, activity, stress, () => {
            });
        }

        navigation.goBack()

    };

    return (
        <View
            style={{ ...styles.container, backgroundColor: color.background }}
        >
            <Header navigation={navigation} />
            <View style={{ width: '90%', justifyContent: 'center' }}>
                <View
                    style={{
                        ...styles.sliderspace,
                        backgroundColor: color.backgrounds
                    }}
                >
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>
                        Anxiety
                    </Text>
                    <View>
                        <Slider
                            value={anxietyView}
                            onValueChange={(val) => {
                                setAnxiety(Math.round(val * 100) / 10);
                                setAnxietyView(val);
                            }}
                            thumbStyle={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                backgroundColor: color.highlight
                            }}
                            minimumTrackTintColor={color.primaryText}
                            maximumTrackTintColor={color.primary}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...styles.sliderspace,
                        backgroundColor: color.backgrounds
                    }}
                >
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>
                        Energy
                    </Text>
                    <View>
                        <Slider
                            value={energyView}
                            onValueChange={(val) => {
                                setEnergy(Math.round(val * 100) / 10);
                                setEnergyView(val);
                            }}
                            thumbStyle={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                backgroundColor: color.highlight
                            }}
                            minimumTrackTintColor={color.primaryText}
                            maximumTrackTintColor={color.primary}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...styles.sliderspace,
                        backgroundColor: color.backgrounds
                    }}
                >
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>
                        Activity
                    </Text>
                    <View>
                        <Slider
                            value={activityView}
                            onValueChange={(val) => {
                                setActivity(Math.round(val * 100) / 10);
                                setActivityView(val);
                            }}
                            thumbStyle={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                backgroundColor: color.highlight
                            }}
                            minimumTrackTintColor={color.primaryText}
                            maximumTrackTintColor={color.primary}
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...styles.sliderspace,
                        backgroundColor: color.backgrounds
                    }}
                >
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>
                        Stress
                    </Text>
                    <View>
                        <Slider
                            value={stressView}
                            onValueChange={(val) => {
                                setStress(Math.round(val * 100) / 10);
                                setStressView(val);
                            }}
                            thumbStyle={{
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                backgroundColor: color.highlight
                            }}
                            minimumTrackTintColor={color.primaryText}
                            maximumTrackTintColor={color.primary}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    submit()
                }}
                style={{ ...styles.button, backgroundColor: color.primary }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: color.inactive
                    }}
                >
                    Complete
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const Header = (props) => {
    const { navigation } = props;
    const { color } = useContext(ColorContext);

    return (
        <View style={{ backgroundColor: color.primary, width: '100%' }}>
            <SafeAreaView>
                <View
                    style={{ ...styles.header, backgroundColor: color.primary }}
                >
                    <TouchableOpacity
                        style={{
                            position: 'relative',
                            left: 5
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon
                            name="chevron-left"
                            color={color.primaryText}
                            size={28}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Mood Tracker</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};
