import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Components/Home';

describe('Home Component', () => {
  test('renders home page with welcome message', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Welcome to Pizzeria')).toBeInTheDocument();
  });

  test('renders home page with description', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Discover the best pizzas in town')).toBeInTheDocument();
  });

  test('renders order now button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument();
  });

  test('renders build your pizza button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: 'Build Your Pizza' })).toBeInTheDocument();
  });
});
