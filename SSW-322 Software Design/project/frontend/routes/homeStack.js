import { createStackNavigator } from "react-navigation-stack"
import React from "react"
import { TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import HomeScreen from "../screens/homeScreen"
import ClubView from "../screens/clubView"
import BookView from "../screens/bookView"
import SearchView from "../screens/searchView"
import CreateView from "../screens/createView"
import ClubInfoView from "../screens/clubInfoView"
import { Global } from "../styles/Global"

const screens = {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: true,
                title: "Atticus",
                headerStyle: Global.headerStyle,
                headerTitleStyle: Global.headerTitleStyle,
                gestureEnabled: false,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchView")}
                        style={{ paddingLeft: 16, paddingBottom: 4 }}
                    >
                        <Icon name="search" color="#FFF" size={28} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CreateView")}
                        style={{ paddingRight: 16, paddingBottom: 4 }}
                    >
                        <Icon name="plus" color="#FFF" size={28} />
                    </TouchableOpacity>
                ),
            }
        },
    },
    ClubView: {
        screen: ClubView,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: true,
                title: navigation.state.params[1].title,
                headerStyle: Global.headerStyle,
                headerTitleStyle: Global.headerTitleStyle,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("HomeScreen")}
                        style={{ paddingLeft: 8 }}
                    >
                        <Icon name="chevron-left" color="#FFF" size={32} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ClubInfoView", navigation.state)}
                        style={{ paddingRight: 8 }}
                    >
                        <Icon name="info-circle" color="#FFF" size={32} />
                    </TouchableOpacity>
                ),
            }
        },
    },
    BookView: {
        screen: BookView,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: true,
                title: navigation.state.params.title,
                headerStyle: Global.headerStyle,
                headerTitleStyle: Global.headerTitleStyle,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack(null)}
                        style={{ paddingLeft: 8 }}
                    >
                        <Icon name="chevron-left" color="#FFF" size={32} />
                    </TouchableOpacity>
                ),
            }
        },
    },
    SearchView: {
        screen: SearchView,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: true,
                title: "Search View",
                headerStyle: Global.headerStyle,
                headerTitleStyle: Global.headerTitleStyle,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.goBack(null)}
                        style={{ paddingLeft: 8 }}
                    >
                        <Icon name="chevron-left" color="#FFF" size={32} />
                    </TouchableOpacity>
                ),
            }
        },
    },
    CreateView: {
        screen: CreateView,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: true,
                title: "Join a Club",
                headerStyle: Global.headerStyle,
                headerTitleStyle: Global.headerTitleStyle,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("HomeScreen")}
                        style={{ paddingLeft: 8 }}
                    >
                        <Icon name="chevron-left" color="#FFF" size={32} />
                    </TouchableOpacity>
                ),
            }
        },
    },
	ClubInfoView: {
		screen: ClubInfoView,
		navigationOptions: ({ navigation }) => {
			return {
				headerShown: true,
				title: 'Club Info',
				headerStyle: Global.headerStyle,
				headerTitleStyle: Global.headerTitleStyle,
				headerLeft: () => (
				  <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{paddingLeft: 8}}>
					<Icon
						name='chevron-left'
						color='#FFF'
						size={32}
					/>
					</TouchableOpacity>
				),
			}
		}
	},
};

const HomeStack = createStackNavigator(screens)
export default HomeStack
