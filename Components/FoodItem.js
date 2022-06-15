// Components/FoodItem.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

class FoodItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFoodFavorite) {
          return (
            <View style={styles.fav_container}>
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/ic_favorite_plain.png')}
                />
            </View>
          );
        }
    }
        
    render() {
        const food = this.props.food;
        return (
            <TouchableOpacity 
                style={styles.main_container}
                onPress={() => {
                    this.props.navigation.navigate("FoodDetails", {id: food.id});
                }}
            >
                <View style={styles.fav_container}>
                    <Image
                        style={styles.favorite_image}
                        source={require('../Images/food.png')}
                    />
                </View>
                <View style={styles.content_container}>
                    <Text style={styles.text_name}>{food.name}</Text>
                </View>
                {this._displayFavoriteImage()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        margin: 5,
        backgroundColor: '#3d3d3d',
        borderRadius: 10,
    },
    content_container: {
        flex: 0.6
    },
    fav_container: {
        flex: 0.2,
        justifyContent: 'center',
    },
    favorite_image: {
        width: 25,
        height: 25,
        margin: 5,
        alignSelf: 'center'
    },
    text_name : {
        color: 'white',
        margin: 10,
    }
});

export default FoodItem;
