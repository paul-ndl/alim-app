// Components/Favorites.js

import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import FoodItem from './FoodItem';
import { connect } from 'react-redux';

class Favorites extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.favoritesFood}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return(
                            <FoodItem 
                                isFoodFavorite={true}
                                navigation={this.props.navigation} 
                                food={item}
                                nav={"details"}
                            />
                        );
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10,
        backgroundColor: '#2c2c2c',
    },
    text: {
        color: 'white'
    }
});

const mapStateToProps = state => {
    return {
        favoritesFood: state.toggleFavorite.favoritesFood
    }
}

export default connect(mapStateToProps)(Favorites);
