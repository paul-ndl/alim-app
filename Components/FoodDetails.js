// Components/FoodDetails.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SectionList, FlatList } from 'react-native';
import food_infos from '../Helpers/Food';
import { connect } from 'react-redux';


class FoodDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {food: {id: undefined}, data_infos: []};
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: <Text>Détail de l'aliment</Text>,
            headerTitleStyle: {
                color: '#0e8f00',
                fontSize: 17
            },
            headerStyle: {
                backgroundColor: '#1e1e1e',
                shadowColor: 'transparent'
            },
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: 20, alignItems: 'center'}}
                    onPress={() => {
                        navigation.goBack(null);
                    }}
                >
                    <Image
                        source={require('../Images/ic_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            ),
        });
    }

    _loadFood(id) {
        if (id != this.state.food.id) {
            this.setState({
                food: food_infos[id - 1],
                data_infos: [
                    {
                        title: 'CATÉGORIE',
                        data: food_infos[id - 1].category
                    },
                    {
                        title: 'ÉCART',
                        data: food_infos[id - 1].gluten
                    },
                    {
                        title: 'COMMENTAIRES',
                        data: food_infos[id - 1].comments
                    },
                    {
                        title: 'INTESTINS FRAGILES',
                        data: food_infos[id - 1].intestine
                    },
                    {
                        title: 'FODMAPs',
                        data: food_infos[id - 1].fodmaps
                    }
                ],
            });
        }
    }

    _displayFavoriteImage() {
        let sourceImage = require('../Images/ic_favorite_border.png');
        if (this.props.favoritesFood.findIndex(item => item.id === this.state.food.id) !== -1) {
            sourceImage = require('../Images/ic_favorite_plain.png');
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        );
    }

    componentDidMount(){
        this._loadFood(this.props.navigation.state.params.id);
    }

    componentDidUpdate(){
        this._loadFood(this.props.navigation.state.params.id);
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.food };
        this.props.dispatch(action);
    }
        
    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.logo_container}>
                    <Image
                        style={styles.logo}
                        source={require('../Images/food.png')}
                    />
                </View>
                <View style={styles.content_container}>
                    <Text style={styles.text_name}>{this.state.food.name}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => {
                            this._toggleFavorite();
                        }}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                </View>
                <View style = {{flex: 0.7}}>
                    <SectionList
                        sections={this.state.data_infos}
                        keyExtractor={(item, index) => item.id ? item.id.toString(): item.toString() + " " + index.toString()}
                        renderItem={({item}) => {
                            if (item.toLowerCase().indexOf("végétaux") !== -1 || item.toLowerCase().indexOf("pas d'écart") !== -1 || item.toLowerCase().indexOf("sans fodmaps") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#0e8f00", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("inflammatoire") !== -1 || item.toLowerCase().indexOf("= écart") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#E9005F", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("excitant / dévitalisant") !== -1 || item.toLowerCase().indexOf("produit très transformé") !== -1 || item.toLowerCase().indexOf("protéine encrassante") !== -1 || item.toLowerCase().indexOf("féculent encrassant") !== -1 || item.toLowerCase().indexOf("(faible à riche)") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#E9A18F", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("protéine peu encrassante") !== -1 || item.toLowerCase().indexOf("féculent peu encrassant") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#7EB6EA", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("faire attention") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#EA7C2B", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("(riche)") !== -1 || item.toLowerCase().indexOf("(modérée à riche)") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#D185D1", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else if (item.toLowerCase().indexOf("(faible à modérée)") !== -1) {
                                return(
                                    <Text style = {{backgroundColor: "#DFE65E", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            } else {
                                return(
                                    <Text style = {{backgroundColor: "#777a78", borderRadius: 20, padding: 5, marginHorizontal: 30, marginVertical: 5, textAlignVertical: 'center', textAlign: 'center', color: "white"}}>{item}</Text>
                                );
                            }
                            
                        }}
                        renderSectionHeader={({ section: { title } }) => {
                            return(
                                <View style={{borderBottomWidth: 2, borderColor: "#393939", backgroundColor: "#2c2c2c", flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style = {{color: "#0e8f00", textAlign: 'center', marginTop: 10, marginBottom: 10}}>{title}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        favoritesFood: state.toggleFavorite.favoritesFood
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch: (action) => { dispatch(action) }
    });
}
  

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#2c2c2c'
    },
    content_container: {
        justifyContent: 'center',
        margin: 5,
        flex: 0.1
    },
    text_name : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo_container: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    logo: {
        width: 80,
        height: 80
    },
    favorite_container: {
        alignItems: 'center',
        margin: 5,
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    icona: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10
    },
    iconb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#aaaaaa",
        marginRight: 10
    },
    iconc: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    icon: {
        width: 30,
        height: 30
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
