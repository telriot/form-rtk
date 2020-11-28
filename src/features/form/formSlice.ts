import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/rootReducer';
import { timeout } from '../../lib';
type TStatus = 'idle' | 'fulfilled' | 'rejected' | 'pending';
type TUser = {
  firstName: string;
  lastName: string;
  email: string;
};
type TFormState = {
  status: TStatus;
  user?: TUser;
  error?: string;
  message?: string;
};

const initialState: TFormState = {
  error: '',
  message: '',
  status: 'idle',
  user: {
    firstName: '',
    lastName: '',
    email: ''
  }
};
class APIResponse {
  message: string;
  success: boolean;
  user?: TUser;

  constructor(message: string, success: boolean, user: TUser | undefined) {
    this.message = message;
    this.success = success;
    this.user = user;
  }
}
export const getUser = createAsyncThunk('form/getUser', async () => {
  const mockData = {
    firstName: 'Ben',
    lastName: 'Tartarini',
    email: 'ben@gmail.com'
  };
  try {
    await timeout(2000);
    return new APIResponse('User logged A-OK', true, mockData);
  } catch (error) {
    return new APIResponse(
      'Looks like you are not logged in, please try again',
      false,
      undefined
    );
  }
});

export const updateUser = createAsyncThunk(
  'form/updateUser',
  async (update: TUser) => {
    try {
      await timeout(2000);
      if (Math.random() < 0.5) throw new Error('Server broke');
      return new APIResponse('User logged A-OK', true, update);
    } catch (error) {
      console.error(error);
      return new APIResponse(
        'Something went wrong, please try again',
        false,
        undefined
      );
    }
  }
);

const form = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { user, message, success } = action.payload;
      state.status = 'fulfilled';
      if (success) {
        state.error = undefined;
        state.message = message;
        state.user = user;
      } else {
        state.error = message;
        state.message = undefined;
      }
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = 'Something went wrong with our servers';
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user, message, success } = action.payload;
      state.status = 'fulfilled';

      if (success) {
        state.error = undefined;
        state.message = message;
        state.user = user;
      } else {
        state.error = message;
        state.message = undefined;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = 'Something went wrong with our servers';
    });
  }
});

export const {} = form.actions;

export const selectError = (state: RootState) => state.form.error;
export const selectMessage = (state: RootState) => state.form.message;
export const selectStatus = (state: RootState) => state.form.status;
export const selectUser = (state: RootState) => state.form.user;

export default form.reducer;
