import userSlice, { logout, loginUser } from '../reduxStore/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock axios to avoid actual API calls
jest.mock('axios');

describe('userSlice', () => {
  let store;

  beforeEach(() => {
    // Create a new store for each test
    store = configureStore({
      reducer: {
        user: userSlice
      }
    });
  });

  test('should handle initial state', () => {
    expect(userSlice(undefined, { type: 'unknown' })).toEqual({
      user: null,
      status: 'idle',
      error: null
    });
  });

  test('should handle logout action', () => {
    // First set a user in the state
    const initialState = {
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      status: 'succeeded',
      error: null
    };

    const actual = userSlice(initialState, logout());
    expect(actual.user).toBeNull();
    expect(actual.status).toEqual('idle');
    expect(actual.error).toBeNull();
  });

  describe('loginUser thunk', () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };

    test('should handle successful login', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      };

      // Mock axios.post to resolve successfully
      axios.post.mockResolvedValue({ data: mockUser });

      // Dispatch the thunk
      await store.dispatch(loginUser(userData));

      // Get the updated state
      const state = store.getState().user;

      expect(state.status).toEqual('succeeded');
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('should handle failed login', async () => {
      const errorMessage = 'Invalid credentials';

      // Mock axios.post to reject with an error
      axios.post.mockRejectedValue({
        response: {
          data: {
            message: errorMessage
          }
        }
      });

      // Dispatch the thunk
      await store.dispatch(loginUser(userData));

      // Get the updated state
      const state = store.getState().user;

      expect(state.status).toEqual('failed');
      expect(state.user).toBeNull();
      expect(state.error).toEqual(errorMessage);
    });

    test('should handle pending login', async () => {
      // Mock axios.post to delay resolution
      axios.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      // Dispatch the thunk
      const promise = store.dispatch(loginUser(userData));
      
      // Check pending state immediately
      const state = store.getState().user;
      expect(state.status).toEqual('loading');
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();

      // Wait for the promise to resolve
      await promise;
    });
  });
});
