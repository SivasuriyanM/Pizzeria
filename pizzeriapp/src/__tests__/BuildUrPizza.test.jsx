import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BuildUrPizza from '../Components/BuildUrPizza';
import { mystore } from '../reduxStore/myStore';

// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BuildUrPizza Component', () => {
  const mockIngredients = [
    {
      id: '1',
      tname: 'Tomato Sauce',
      price: 2,
      image: 'tomato.jpg'
    },
    {
      id: '2',
      tname: 'Cheese',
      price: 3,
      image: 'cheese.jpg'
    },
    {
      id: '3',
      tname: 'Pepperoni',
      price: 4,
      image: 'pepperoni.jpg'
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

  test('renders BuildUrPizza component with title', () => {
    renderWithProviders(<BuildUrPizza />);
    
    expect(screen.getByText('Build Your Own Pizza')).toBeInTheDocument();
    expect(screen.getByText('Create your perfect pizza by selecting your favorite ingredients')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    renderWithProviders(<BuildUrPizza />);
    
    // Initially, there should be no ingredient cards displayed
    expect(screen.queryByTestId('ingredient-card')).not.toBeInTheDocument();
  });

  test('displays ingredients after fetching data', async () => {
    // Mock axios.get to return ingredient data
    require('axios').get.mockResolvedValue({ data: mockIngredients });

    renderWithProviders(<BuildUrPizza />);
    
    // Wait for the ingredients to be loaded and displayed
    await screen.findByText('Tomato Sauce');
    
    expect(screen.getByText('Tomato Sauce')).toBeInTheDocument();
    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.getByText('Pepperoni')).toBeInTheDocument();
  });

  test('updates total price when ingredients are added', async () => {
    require('axios').get.mockResolvedValue({ data: mockIngredients });

    renderWithProviders(<BuildUrPizza />);
    
    await screen.findByText('Tomato Sauce');
    
    // Initially total should be ₹0
    expect(screen.getByText('Total: ₹0')).toBeInTheDocument();
    
    // Add Tomato Sauce (₹2)
    const tomatoCheckbox = screen.getByLabelText('Add Ingredient');
    fireEvent.click(tomatoCheckbox);
    
    // Total should now be ₹2
    expect(screen.getByText('Total: ₹2')).toBeInTheDocument();
    
    // Add Cheese (₹3)
    const cheeseCheckbox = screen.getAllByLabelText('Add Ingredient')[1];
    fireEvent.click(cheeseCheckbox);
    
    // Total should now be ₹5
    expect(screen.getByText('Total: ₹5')).toBeInTheDocument();
  });

  test('updates total price when ingredients are removed', async () => {
    require('axios').get.mockResolvedValue({ data: mockIngredients });

    renderWithProviders(<BuildUrPizza />);
    
    await screen.findByText('Tomato Sauce');
    
    // Add Tomato Sauce (₹2)
    const tomatoCheckbox = screen.getByLabelText('Add Ingredient');
    fireEvent.click(tomatoCheckbox);
    
    // Total should now be ₹2
    expect(screen.getByText('Total: ₹2')).toBeInTheDocument();
    
    // Remove Tomato Sauce
    fireEvent.click(tomatoCheckbox);
    
    // Total should now be back to ₹0
    expect(screen.getByText('Total: ₹0')).toBeInTheDocument();
  });

  test('navigates to cart after adding custom pizza', async () => {
    require('axios').get.mockResolvedValue({ data: mockIngredients });
    require('axios').post.mockResolvedValue({ data: 'success' });

    renderWithProviders(<BuildUrPizza />);
    
    await screen.findByText('Tomato Sauce');
    
    // Add an ingredient
    const tomatoCheckbox = screen.getByLabelText('Add Ingredient');
    fireEvent.click(tomatoCheckbox);
    
    // Click the Proceed button
    const proceedButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(proceedButton);
    
    // Check if navigate was called
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
