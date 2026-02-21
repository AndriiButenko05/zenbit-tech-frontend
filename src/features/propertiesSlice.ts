import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProperties } from "../api/propertiesApi";
import type { Property } from "../types/property";
export const loadProperties = createAsyncThunk(
  "properties/loadAll",
  async (_, thunkAPI) => {
    try {
      return await fetchProperties();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load data");
    }
  },
);
interface PropertiesState {
  deals: Property[];
  loading: boolean;
  error: string | null;
}
const initialState: PropertiesState = {
  deals: [],
  loading: false,
  error: null,
};
const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(loadProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default propertiesSlice.reducer;
