import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { mystore } from '../reduxStore/myStore';

describe('Navbar Component', () => {
  const renderWithProviders = (component) => {
    return render(
      <Provider store={mystore}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders navbar with brand name', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Pizzeria')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Order Pizza')).toBeInTheDocument();
    expect(screen.getByText('Build Ur Pizza')).toBeInTheDocument();
  });

  test('renders login link when user is not logged in', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders cart link when user is logged in', () => {
    // Create a mock store with a logged in user
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { name: 'Test User' },
          status: 'succeeded'
        }
      })
    };
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('renders user name when user is logged in', () => {
    // Create a mock store with a logged in user
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { name: 'Test User' },
          status: 'succeeded'
        }
      })
    };
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
