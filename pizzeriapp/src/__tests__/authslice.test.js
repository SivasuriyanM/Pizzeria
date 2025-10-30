import authslice, { choice } from '../reduxStore/authslice';

describe('authslice reducer', () => {
  const initialState = {
    value: 'Sign In'
  };

  test('should handle initial state', () => {
    expect(authslice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle choice action', () => {
    const actual = authslice(initialState, choice('Sign Up'));
    expect(actual.value).toEqual('Sign Up');
  });

  test('should handle choice action with different values', () => {
    const state1 = authslice(initialState, choice('Login'));
    expect(state1.value).toEqual('Login');

    const state2 = authslice(initialState, choice('Register'));
    expect(state2.value).toEqual('Register');
  });
});
