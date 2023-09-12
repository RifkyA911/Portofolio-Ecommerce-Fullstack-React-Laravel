import toolkit from "@reduxjs/toolkit";

const {configureStore, createSlice} = toolkit;


// menggabungkan actions dan reducer
const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action){
            state.push(action.payload)
        }
    } 
})

const store = configureStore({
    reducer:{
        cart: cartSlice.reducer,
    }, 
})

console.log("Data Awal : ", store.getState())

store.subscribe(()=>{
    console.log("Data Update : ", store.getState())
})

store.dispatch(cartSlice.actions.addToCart({id:1,username:"bambank"}))