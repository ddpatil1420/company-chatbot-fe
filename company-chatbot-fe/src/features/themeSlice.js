import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;

const applyTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
};

export const loadTheme = () => (dispatch) => {
    const theme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(theme));
    applyTheme(theme);
};

export const toggleTheme = () => (dispatch, getState) => {
    const currentTheme = getState().theme.theme;
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(nextTheme));
    applyTheme(nextTheme);
};

export default themeSlice.reducer;