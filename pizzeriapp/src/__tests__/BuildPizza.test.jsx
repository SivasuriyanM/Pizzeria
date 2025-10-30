import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BuildPizza from '../Components/BuildPizza';
import { mystore } from '../reduxStore/myStore';

// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  put: jest.fn(),
}));

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('BuildPizza Component', () => {
  const mockPizza = {
    _id: '1',
    name: 'Margherita',
    description: 'Classic pizza with tomato and cheese',
    image: 'margherita.jpg',
    ingredients: ['tomato', 'cheese'],
    price: 10
  };

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

  test('renders BuildPizza component with title and pizza name', () => {
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    expect(screen.getByText('Customize Your Pizza')).toBeInTheDocument();
    expect(screen.getByText(`Modify your ${mockPizza.name} by adding extra ingredients`)).toBeInTheDocument();
  });

  test('displays all available ingredients', () => {
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    expect(screen.getByText('Extra Cheese')).toBeInTheDocument();
    expect(screen.getByText('Mushrooms')).toBeInTheDocument();
    expect(screen.getByText('Pepperoni')).toBeInTheDocument();
  });

  test('shows initial total price', () => {
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    expect(screen.getByText('Total: ₹10')).toBeInTheDocument();
  });

  test('updates total price when ingredients are added', () => {
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    // Initially total should be ₹10
    expect(screen.getByText('Total: ₹10')).toBeInTheDocument();
    
    // Add Extra Cheese (₹2)
    const cheeseCheckbox = screen.getByLabelText('Add Ingredient');
    fireEvent.click(cheeseCheckbox);
    
    // Total should now be ₹12
    expect(screen.getByText('Total: ₹12')).toBeInTheDocument();
    
    // Add Mushrooms (₹3)
    const mushroomCheckbox = screen.getAllByLabelText('Add Ingredient')[1];
    fireEvent.click(mushroomCheckbox);
    
    // Total should now be ₹15
    expect(screen.getByText('Total: ₹15')).toBeInTheDocument();
  });

  test('updates total price when ingredients are removed', () => {
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    // Add Extra Cheese (₹2)
    const cheeseCheckbox = screen.getByLabelText('Add Ingredient');
    fireEvent.click(cheeseCheckbox);
    
    // Total should now be ₹12
    expect(screen.getByText('Total: ₹12')).toBeInTheDocument();
    
    // Remove Extra Cheese
    fireEvent.click(cheeseCheckbox);
    
    // Total should now be back to ₹10
    expect(screen.getByText('Total: ₹10')).toBeInTheDocument();
  });

  test('calls back function when Cancel button is clicked', () => {
    const mockBack = jest.fn();
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={mockBack} />);
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    
    expect(mockBack).toHaveBeenCalledWith(false);
  });

  test('navigates to cart after adding customized pizza', async () => {
    // Mock axios.put to resolve successfully
    require('axios').put.mockResolvedValue({ data: 'success' });
    
    renderWithProviders(<BuildPizza pizza={mockPizza} ingredient={mockIngredients} userId="user123" back={jest.fn()} />);
    
    const proceedButton = screen.getByRole('button', { name: 'Proceed' });
    fireEvent.click(proceedButton);
    
    // Wait for navigation to happen
    await screen.findByText('Customize Your Pizza');
    
    // Check if navigate was called
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
