import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import OrderPizza from '../Components/OrderPizza';
import { mystore } from '../reduxStore/myStore';

// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  get: jest.fn(),
  put: jest.fn(),
}));

// Mock the BuildPizza component to simplify testing
jest.mock('../Components/BuildPizza', () => () => <div data-testid="build-pizza">Build Pizza Component</div>);

describe('OrderPizza Component', () => {
  const mockPizzas = [
    {
      _id: '1',
      name: 'Margherita',
      description: 'Classic pizza with tomato and cheese',
      image: 'margherita.jpg',
      ingredients: ['tomato', 'cheese'],
      price: 10
    },
    {
      _id: '2',
      name: 'Pepperoni',
      description: 'Pizza with pepperoni slices',
      image: 'pepperoni.jpg',
      ingredients: ['tomato', 'cheese', 'pepperoni'],
      price: 12
    }
  ];

  const mockIngredients = [
    {
      id: '1',
      tname: 'Extra Cheese',
      price: 2,
      image: 'cheese.jpg'
    },
    {
      id: '2',
      tname: 'Mushrooms',
      price: 3,
      image: 'mushrooms.jpg'
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
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders OrderPizza component with title', () => {
    renderWithProviders(<OrderPizza />);
    
    expect(screen.getByText('Order Your Pizza')).toBeInTheDocument();
    expect(screen.getByText('Choose from our delicious selection or create your own masterpiece')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    renderWithProviders(<OrderPizza />);
    
    // Initially, there should be no pizza cards displayed
    expect(screen.queryByTestId('pizza-card')).not.toBeInTheDocument();
  });

  test('displays pizza cards after fetching data', async () => {
    // Mock axios.get to return pizza data
    require('axios').get.mockImplementation((url) => {
      if (url.includes('getpizzas')) {
        return Promise.resolve({ data: mockPizzas });
      } else if (url.includes('getingredients')) {
        return Promise.resolve({ data: mockIngredients });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderWithProviders(<OrderPizza />);
    
    // Wait for the pizzas to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
      expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    });
    
    // Check if pizza cards are displayed
    const pizzaCards = screen.getAllByText(/Pizza/);
    expect(pizzaCards).toHaveLength(2);
  });

  test('shows customize option for each pizza', async () => {
    require('axios').get.mockImplementation((url) => {
      if (url.includes('getpizzas')) {
        return Promise.resolve({ data: mockPizzas });
      } else if (url.includes('getingredients')) {
        return Promise.resolve({ data: mockIngredients });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderWithProviders(<OrderPizza />);
    
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
    });
    
    // Check if customize buttons are present
    const customizeButtons = screen.getAllByText('Customize');
    expect(customizeButtons).toHaveLength(2);
  });

  test('switches to BuildPizza component when customize is clicked', async () => {
    require('axios').get.mockImplementation((url) => {
      if (url.includes('getpizzas')) {
        return Promise.resolve({ data: mockPizzas });
      } else if (url.includes('getingredients')) {
        return Promise.resolve({ data: mockIngredients });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderWithProviders(<OrderPizza />);
    
    await waitFor(() => {
      expect(screen.getByText('Margherita')).toBeInTheDocument();
    });
    
    // Click the customize button for the first pizza
    const customizeButton = screen.getAllByText('Customize')[0];
    customizeButton.click();
    
    // Check if BuildPizza component is rendered
    await waitFor(() => {
      expect(screen.getByTestId('build-pizza')).toBeInTheDocument();
    });
  });
});
