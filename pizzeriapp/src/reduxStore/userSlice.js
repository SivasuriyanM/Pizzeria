import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      
      const res = await axios.post("http://localhost:8080/users/login", {
        email,
        password
      })
      console.log(res.data);
      return res.data; // {id, name, email}
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status ="idle"
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        
      });
  }
});

// let userSlice=createSlice({
//     name:"user",
//     initialState:{
//         value:{},
//         isLoged:false
//     },
//     reducers:{
//         set:(state,action)=>{
//             state.value=action.payload
//             state.isLoged =true
//         },
//         remove:(state)=>{
//             state.value={}
//             state.isLoged =false
//         }
//     }
// })

export const { logout } = userSlice.actions;
export default userSlice.reducer;
