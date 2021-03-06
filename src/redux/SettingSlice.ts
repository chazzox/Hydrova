import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkInterface } from '@typings/Thunk';
import { themeKeys } from '@utils/themes';

export const refreshAccessToken = createAsyncThunk<AuthenticationSuccess, { refresh_token: string }, ThunkInterface>(
	'settingsSlice/refreshAccessToken',
	async ({ refresh_token }, thunkApi) => {
		const urlencoded = new URLSearchParams();
		urlencoded.append('grant_type', 'refresh_token');
		urlencoded.append('refresh_token', refresh_token);
		const response = await fetch('https://www.reddit.com/api/v1/access_token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + btoa(process.env.GATSBY_REDDIT_ID + ':' + process.env.GATSBY_REDDIT_SECRET),
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlencoded
		});
		const responseJSON = await response.json();
		if (response.status === 400) return thunkApi.rejectWithValue(responseJSON as Failure);
		return responseJSON as AuthenticationSuccess;
	}
);

const SettingsSlice = createSlice({
	name: 'settingsSlice',
	initialState: {
		isLoggedIn: false,
		authenticationResultReturned: false,
		access_token: '',
		expires_in: 0,
		authenticationErrors: [] as string[],
		themeKey: 'defaultDark' as themeKeys
	},
	reducers: {
		setNoAuthCookies: (state) => {
			state.authenticationResultReturned = true;
		},
		setTheme: (state, action) => {
			state.themeKey = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.authenticationResultReturned = true;
			state.access_token = action.payload.access_token;
			state.expires_in = action.payload.expires_in;
		});
		builder.addCase(refreshAccessToken.rejected, (state, action) => {
			state.authenticationResultReturned = true;
			action.payload?.message && state.authenticationErrors.push(action.payload.message);
		});
	}
});

export const { setNoAuthCookies, setTheme } = SettingsSlice.actions;

export default SettingsSlice;
