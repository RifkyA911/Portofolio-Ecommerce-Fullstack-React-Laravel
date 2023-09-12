import toolkit from "@reduxjs/toolkit";

const {configureStore, createReducer, createAction} = toolkit;

// const initialState = {
//     cart : []
// }

// ================== Action =====================

const addCart = createAction("ADD_TO_CART")

// const cartReducer = createReducer(initialState, (builder) => {
//     //equivalent as switch case
//     builder.addCase("ADD_TO_CART", (state, action)=>{
//         state.cart.push(action.payload);
//     });
// });
const cartReducer = createReducer([], (builder) => {
    //builder.addCase equivalent as switch case
    builder.addCase(addCart, (state, action)=>{
        state.push(action.payload);
    });
});

// create store
const store = configureStore ({
    reducer:{
        cart: cartReducer
    }
})

// ================== Execute =====================


// show initial store data
console.log("Data Awal : ", store.getState())

// show update store data
store.subscribe(()=>{
    console.log("Data Update : ", store.getState())
})
// store data
const action1 = {
    type: "ADD_TO_CART",
    payload: {
        id: 5,
        qty: 20
    }
}

// send data
store.dispatch(action1);
store.dispatch({type:"ADD_TO_CART", payload:{id:20, qty:23}});