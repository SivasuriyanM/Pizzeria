import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Components/Cart';
import { mystore } from '../reduxStore/myStore';

// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

describe('Cart Component', () => {
  const mockCartItems = [
    {
      _id: 'cartItem1',
      pizzaId: {
        _id: 'pizza1',
        name: 'Margherita',
        description: 'Classic pizza with tomato and cheese',
        image: 'margherita.jpg',
        ingredients: ['tomato', 'cheese'],
        price: 10
      },
      quantity: 2
    },
    {
      _id: 'cartItem2',
      pizzaId: {
        _id: 'pizza2',
        name: 'Pepperoni',
        description: 'Pizza with pepperoni slices',
        image: 'pepperoni.jpg',
        ingredients: ['tomato', 'cheese', 'pepperoni'],
        price: 12
      },
      quantity: 1
    }
  ];

  const renderWithProviders = (component) => {
    return render(
      <Provider store={mystore}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Cart component with title', () => {
    renderWithProviders(<Cart />);
    
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Review your items before checkout')).toBeInTheDocument();
  });

  test('shows empty cart message when cart is empty', async () => {
    require('axios').get.mockResolvedValue({ data: [] });
    
    renderWithProviders(<Cart />);
    
    await waitFor(() => {
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.getByText('Looks like you haven\'t added any items to your cart yet')).toBeInTheDocument();
    });
  });

  test('displays cart items when cart is not empty', async () => {
    // Mock the user slice to return a user ID
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { _id: 'user123' },
          status: 'succeeded'
        }
      })
    };
    
    require('axios').get.mockResolvedValue({ data: mockCartItems });
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
      expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    });
    
    // Check quantities
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Check prices
    expect(screen.getByText('₹10')).toBeInTheDocument();
    expect(screen.getByText('₹12')).toBeInTheDocument();
  });

  test('calculates and displays correct total amount', async () => {
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { _id: 'user123' },
          status: 'succeeded'
        }
      })
    };
    
    require('axios').get.mockResolvedValue({ data: mockCartItems });
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      // Total should be (2 * ₹10) + (1 * ₹12) = ₹32
      expect(screen.getByText('₹32')).toBeInTheDocument();
    });
  });

  test('removes item from cart when Remove button is clicked', async () => {
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { _id: 'user123' },
          status: 'succeeded'
        }
      })
    };
    
    // First mock get to return items, then mock delete and get again
    require('axios').get
      .mockResolvedValueOnce({ data: mockCartItems })
      .mockResolvedValueOnce({ data: [mockCartItems[1]] }); // After deletion, only pepperoni remains
    
    require('axios').delete.mockResolvedValue({ data: 'success' });
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
    });
    
    // Click remove button for Margherita
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    
    // Wait for the cart to update
    await waitFor(() => {
      expect(screen.queryByText('Margherita')).not.toBeInTheDocument();
      expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    });
  });

  test('updates quantity when + or - buttons are clicked', async () => {
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { _id: 'user123' },
          status: 'succeeded'
        }
      })
    };
    
    // Mock get to return items, then mock put and get again
    require('axios').get
      .mockResolvedValueOnce({ data: mockCartItems })
      .mockResolvedValueOnce({ data: [{ ...mockCartItems[0], quantity: 3 }, mockCartItems[1]] });
    
    require('axios').put.mockResolvedValue({ data: 'success' });
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
    
    // Click + button to increase quantity of Margherita
    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    
    // Wait for the cart to update
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  test('disables - button when quantity is 1', async () => {
    const mockStore = {
      ...mystore,
      getState: () => ({
        user: {
          user: { _id: 'user123' },
          status: 'succeeded'
        }
      })
    };
    
    require('axios').get.mockResolvedValue({ data: mockCartItems });
    
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    });
    
    // Find the decrement button for Pepperoni (quantity 1)
    const decrementButtons = screen.getAllByText('-');
    const pepperoniDecrementButton = decrementButtons[1]; // Second button should be for Pepperoni
    
    expect(pepperoniDecrementButton).toBeDisabled();
  });
});
