import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    FontAwesome5 as FA5Icon,
    Feather as FEIcon,
    MaterialCommunityIcons as MCIcon
} from '@expo/vector-icons/';

import Journals from './HomeStacks/Journals';
import Moods from './HomeStacks/Moods';
import Resources from './HomeStacks/Resources';
import Profile from './HomeStacks/Profile';
import Collection from './HomeStacks/Collection';
import { navigationStyles } from '../styles/navigationStyles';
import { showNav } from '../functions/util/navigation';
import generalStyles from '../styles/generalStyles';
import { ColorContext } from '../functions/providers/ColorContext';

const tabHeight = Platform.OS === 'ios' ? 40 : 25;
const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
    const { color } = useContext(ColorContext);

    const iconStyle = {
        height: tabHeight,
        alignItems: 'center',
        shadowRadius: 0.3,
        width: 32,
        marginTop: 15
    };

    return (
        <Tab.Navigator
            initialRouteName="Journals"
            timingConfig={0}
            tabBarPosition={0}
            screenOptions={{
                showIcon: true
            }}
            swipeEnabled={false}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: color.highlight,
                inactiveTintColor: color.inactive,
                style: {
                    ...navigationStyles.footer,
                    ...generalStyles.shadow,
                    backgroundColor: color.primary,
                    shadowColor: color.shadow,
                    borderTopColor: 'transparent'
                }
            }}
        >
            <Tab.Screen
                name="Journals"
                component={Journals}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FA5Icon
                            name="pen-nib"
                            style={iconStyle}
                            color={color}
                            size={28}
                        />
                    ),
                    tabBarVisible: showNav(navigation)
                }}
            />
            <Tab.Screen
                name="Moods"
                component={Moods}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FEIcon
                            name="smile"
                            style={iconStyle}
                            color={color}
                            size={28}
                        />
                    ),
                    tabBarVisible: showNav(navigation)
                }}
            />
            <Tab.Screen
                name="Collection"
                component={Collection}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MCIcon
                            name="flower-tulip-outline"
                            style={{ ...iconStyle, marginBottom: 4 }}
                            color={color}
                            size={34}
                        />
                    ),
                    tabBarVisible: showNav(navigation)
                }}
            />
            <Tab.Screen
                name="Resources"
                component={Resources}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FA5Icon
                            name="link"
                            style={iconStyle}
                            color={color}
                            size={28}
                        />
                    ),
                    tabBarVisible: showNav(navigation)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FA5Icon
                            name="user"
                            style={iconStyle}
                            color={color}
                            size={28}
                        />
                    ),
                    tabBarVisible: showNav(navigation)
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeTabs;
