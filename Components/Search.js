// Components/Search.js

import React from 'react';
import { StyleSheet, View, TextInput, Image, FlatList } from 'react-native';
import FoodItem from './FoodItem';
import food_infos from '../Helpers/Food';

import { connect } from 'react-redux';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = "";
        this.state = {food: []};
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
        this._searchAction();
    }

    _searchAction(name){
        var results = [];
        var index;
        var entry;
    
        name = this.searchedText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (index = 0; index < food_infos.length; ++index) {
            entry = food_infos[index];
            if (entry && entry.name && entry.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(name) !== -1) {
                results.push(entry);
            }
        }
        if (name.length > 0) {
            this.setState({food: results});
        } else {
            this.setState({food: []});
        }
        
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.input_container}>
                    <View style={styles.input_subcontainer}>
                        <View style={styles.icon_container}>
                            <Image
                                source={require('../Images/ic_search_bar.png')}
                                style={styles.icon}
                            />
                        </View>
                        <TextInput
                            style={styles.textinput}
                            placeholderTextColor= 'white'
                            placeholder='Recherche'
                            onChangeText={(text) => this._searchTextInputChanged(text)}
                            onSubmitEditing={() => this._searchAction()}
                        />
                    </View>
                </View>
                <FlatList
                    data={this.state.food}
                    keyExtractor={(item, index) => item + index }
                    renderItem={({item}) => {
                        return(
                            <FoodItem 
                                isFoodFavorite={(this.props.favoritesFood.findIndex(food => food.id === item.id) !== -1) ? true : false}
                                navigation={this.props.navigation} 
                                food={item}
                                nav={"details"}
                            />
                        );
                    }
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        favoritesFood: state.toggleFavorite.favoritesFood
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#2c2c2c'
    },
    icon: {
        width: 25,
        height: 25,
    },
    icon_container: {
        flex: 0.1,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_container: {
        backgroundColor: '#1e1e1e',
    },
    input_subcontainer: {
        backgroundColor: '#3d3d3d',
        margin: 10,
        flexDirection: 'row',
        borderColor: '#393939',
        borderWidth: 2,
        borderRadius: 10,
    },
    textinput: {
        height: 35,
        paddingLeft: 10,
        paddingRight: 10,
        color: 'white',
        fontSize: 14,
        flex: 0.9
    },
    text: {
        color: 'white', 
        margin : 5
    },
    subtitle_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2c2c2c',
        alignItems: 'center'
    },
    subtitle: {
        color: '#964ff0',
        fontSize: 18, 
        margin: 10,
        textAlign: 'center',
    },
    icona: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10
    }
});

export default connect(mapStateToProps)(Search);
