// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFood: [] };

function toggleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
        const favoriteFoodIndex = state.favoritesFood.findIndex(item => item.id === action.value.id);
        if (favoriteFoodIndex !== -1) {
            nextState = {
                ...state,
                favoritesFood: state.favoritesFood.filter( (item, index) => index !== favoriteFoodIndex)
            };
        } else {
            nextState = {
                ...state,
                favoritesFood: [...state.favoritesFood, action.value]
            };
        }
        return nextState || state;
    default:
        return state;
    }
}

export default toggleFavorite;