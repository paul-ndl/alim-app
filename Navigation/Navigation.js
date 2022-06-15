// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Search from '../Components/Search';
import Favorites from '../Components/Favorites';
import FoodDetails from '../Components/FoodDetails';

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher',
            headerTitleStyle: {
                color: '#0e8f00',
                textAlign: 'center'
            },
            headerStyle: {
                backgroundColor: '#1e1e1e',
                shadowColor: 'transparent'
            }
        }
    },
    FoodDetails: {
        screen: FoodDetails,
    },
});

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Aliments Favoris',
            headerTitleStyle: {
                color: '#0e8f00',
                textAlign: 'center'
            },
            headerStyle: {
                backgroundColor: '#1e1e1e',
                shadowColor: 'transparent'
            }
        }
    },
    FoodDetails: {
        screen: FoodDetails
    }
});

const BetTabNavigator = createBottomTabNavigator(
    {
        Recherche: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image
                                source={require('../Images/ic_search.png')}
                                style={styles.icon}
                            />
                        );
                    } else {
                        return (
                            <Image
                                source={require('../Images/ic_search_inactive.png')}
                                style={styles.icon}
                            />
                        );
                    }
                }
            }
        },
        Favoris: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return (
                            <Image
                                source={require('../Images/ic_favorite.png')}
                                style={styles.icon}
                            />
                        );
                    } else {
                        return (
                            <Image
                                source={require('../Images/ic_favorite_inactive.png')}
                                style={styles.icon}
                            />
                        );
                    }
                }
            }
        },
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#1e1e1e',
            inactiveBackgroundColor: '#1e1e1e',
            activeTintColor: "#0e8f00",
            showLabel: true,
            showIcon: true,
            style: { borderTopWidth: 0}
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});

export default createAppContainer(BetTabNavigator);
