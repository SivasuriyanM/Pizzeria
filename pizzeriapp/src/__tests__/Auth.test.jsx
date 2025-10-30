import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../Components/Auth';
import { mystore } from '../reduxStore/myStore';

// Mock the loginUser thunk to avoid actual API calls
jest.mock('../reduxStore/userSlice', () => ({
  ...jest.requireActual('../reduxStore/userSlice'),
  loginUser: jest.fn(() => ({ type: 'user/loginUser' })),
}));

describe('Auth Component', () => {
  const renderWithProviders = (component) => {
    return render(
      <Provider store={mystore}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form by default', () => {
    renderWithProviders(<Auth />);
    
    // Check if login form elements are present
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    
    // Check if signup form elements are not present
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  test('switches to signup form when Sign Up button is clicked', () => {
    renderWithProviders(<Auth />);
    
    // Initially should show login form
    expect(screen.getByText('Login')).toBeInTheDocument();
    
    // Click the Sign Up button
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(signUpButton);
    
    // Should now show signup form
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('switches back to login form when Login button is clicked', () => {
    renderWithProviders(<Auth />);
    
    // Switch to signup form first
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(signUpButton);
    
    // Verify signup form is displayed
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    
    // Switch back to login form
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    // Should now show login form again
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  });

  test('updates state when input fields are changed', () => {
    renderWithProviders(<Auth />);
    
    // Test login form input changes
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    
    // Switch to signup form
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    fireEvent.click(signUpButton);
    
    // Test signup form input changes
    const nameInput = screen.getByLabelText('Name');
    const signupEmailInput = screen.getByLabelText('Email address');
    const signupPasswordInput = screen.getByLabelText('Password');
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(signupEmailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(signupPasswordInput, { target: { value: 'password123' } });
    
    expect(nameInput.value).toBe('Test User');
    expect(signupEmailInput.value).toBe('test@example.com');
    expect(signupPasswordInput.value).toBe('password123');
  });
});
