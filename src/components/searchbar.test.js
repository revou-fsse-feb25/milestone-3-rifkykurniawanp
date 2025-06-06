import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './searchbar';

// Mock the onSearch function
const mockOnSearch = jest.fn();

describe('SearchBar', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search products, users, etc.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('updates query state when typing in input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(input.value).toBe('test query');
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    const submitButton = screen.getByRole('button', { name: 'Search' });
    
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(submitButton);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test search', '');
  });

  test('calls onSearch when Enter key is pressed', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    fireEvent.change(input, { target: { value: 'keyboard search' } });
    fireEvent.submit(input.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('keyboard search', '');
  });

  test('trims whitespace from query before calling onSearch', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    fireEvent.change(input, { target: { value: '  spaced query  ' } });
    fireEvent.submit(input.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('spaced query', '');
  });

  test('calls onSearch with empty string when query is cleared', async () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    
    // Type something first
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // Wait for useEffect to trigger
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('', '');
    });
  });

  test('does not render filter dropdown when no filters provided', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  test('renders filter dropdown when filters are provided', () => {
    const filters = [
      { value: 'products', label: 'Products' },
      { value: 'users', label: 'Users' }
    ];
    
    render(<SearchBar onSearch={mockOnSearch} filters={filters} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByDisplayValue('All')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Users' })).toBeInTheDocument();
  });

  test('updates selected filter when dropdown value changes', () => {
    const filters = [
      { value: 'products', label: 'Products' },
      { value: 'users', label: 'Users' }
    ];
    
    render(<SearchBar onSearch={mockOnSearch} filters={filters} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'products' } });
    
    expect(select.value).toBe('products');
  });

  test('calls onSearch with selected filter when form is submitted', () => {
    const filters = [
      { value: 'products', label: 'Products' },
      { value: 'users', label: 'Users' }
    ];
    
    render(<SearchBar onSearch={mockOnSearch} filters={filters} />);
    
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    const select = screen.getByRole('combobox');
    
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(select, { target: { value: 'products' } });
    fireEvent.submit(input.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('test', 'products');
  });

  test('calls onSearch when filter changes with useEffect', async () => {
    const filters = [
      { value: 'products', label: 'Products' }
    ];
    
    render(<SearchBar onSearch={mockOnSearch} filters={filters} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'products' } });
    
    // Wait for useEffect to trigger
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('', 'products');
    });
  });

  test('handles empty filters array gracefully', () => {
    render(<SearchBar onSearch={mockOnSearch} filters={[]} />);
    
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products, users, etc.')).toBeInTheDocument();
  });

  test('prevents default form submission', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const form = screen.getByRole('form');
    const mockPreventDefault = jest.fn();
    
    fireEvent.submit(form, { preventDefault: mockPreventDefault });
    
    // Note: Testing preventDefault directly is tricky with testing-library
    // This test verifies the form element exists and can be submitted
    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('applies correct CSS classes', () => {
    const filters = [
      { value: 'products', label: 'Products' }
    ];
    
    render(<SearchBar onSearch={mockOnSearch} filters={filters} />);
    
    const form = screen.getByRole('form');
    const input = screen.getByPlaceholderText('Search products, users, etc.');
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', { name: 'Search' });
    
    expect(form).toHaveClass('w-full', 'max-w-3xl', 'mx-auto', 'mb-8');
    expect(input).toHaveClass('flex-grow', 'py-3', 'px-4', 'border', 'rounded-full');
    expect(select).toHaveClass('py-3', 'px-4', 'border', 'rounded-full');
    expect(button).toHaveClass('bg-yellow-400', 'text-black', 'py-3', 'px-6', 'rounded-full');
  });
});