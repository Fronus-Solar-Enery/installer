import { themeConfig } from '@/theme-config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state based on current configuration
const initialState = {
  ...themeConfig.getConfig(),
};

type ThemeType = 'light' | 'dark';

type ThemeConfigState = typeof initialState & {
  theme?: ThemeType;
  isDarkMode?: boolean;
};

const themeConfigSlice = createSlice({
  name: 'themeConfig',
  initialState,
  reducers: {
    toggleTheme(state: ThemeConfigState, { payload }: PayloadAction<ThemeType>) {
      const newTheme: ThemeType = payload || (state.theme === 'light' ? 'dark' : 'light');
      const updatedConfig = themeConfig.updateConfig({
        theme: newTheme,
        isDarkMode: newTheme === 'dark',
      });

      return {
        ...state,
        ...updatedConfig,
      };
    },


    setPageTitle(_, { payload }: PayloadAction<string>) {
      document.title = `${payload} | Mivator`;
    },
  },
});

export const { toggleTheme, setPageTitle } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;