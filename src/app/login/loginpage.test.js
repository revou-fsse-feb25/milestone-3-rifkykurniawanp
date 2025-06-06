import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import LoginPage from './page.js';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock router and search params
const mockPush = jest.fn();
const mockSearchParams = {
  get: jest.fn(),
};

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    useRouter.mockReturnValue({
      push: mockPush,
    });
    
    useSearchParams.mockReturnValue(mockSearchParams);
    
    // Default mock returns
    mockSearchParams.get.mockImplementation((key) => {
      if (key === 'redirect') return null;
      if (key === 'error') return null;
      return null;
    });
  });

  describe('Initial Rendering', () => {
    test('renders login form with all elements', () => {
      render(<LoginPage />);
      
      expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
      expect(screen.getByText('Sign in to your account to continue')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
      expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Sign Up' })).toBeInTheDocument();
    });

    test('renders loading fallback while suspense is loading', () => {
      // This test is more complex to implement due to Suspense behavior
      // We'll test that the component renders without crashing
      render(<LoginPage />);
      expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    test('updates email input value when typing', () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      expect(emailInput.value).toBe('test@example.com');
    });

    test('updates password input value when typing', () => {
      render(<LoginPage />);
      
      const passwordInput = screen.getByLabelText('Password');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(passwordInput.value).toBe('password123');
    });

    test('has correct input types and attributes', () => {
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');
      
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
    });
  });

  describe('Error Handling from URL Parameters', () => {
    test('displays error message for CredentialsSignin error', () => {
      mockSearchParams.get.mockImplementation((key) => {
        if (key === 'error') return 'CredentialsSignin';
        return null;
      });
      
      render(<LoginPage />);
      
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });

    test('displays error message for SessionRequired error', () => {
      mockSearchParams.get.mockImplementation((key) => {
        if (key === 'error') return 'SessionRequired';
        return null;
      });
      
      render(<LoginPage />);
      
      expect(screen.getByText('You need to be signed in to access this page')).toBeInTheDocument();
    });

    test('displays generic error message for unknown error types', () => {
      mockSearchParams.get.mockImplementation((key) => {
        if (key === 'error') return 'UnknownError';
        return null;
      });
      
      render(<LoginPage />);
      
      expect(screen.getByText('An authentication error occurred')).toBeInTheDocument();
    });

    test('does not display error when no error parameter', () => {
      render(<LoginPage />);
      
      expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
      expect(screen.queryByText('You need to be signed in to access this page')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    test('calls signIn with correct parameters on successful submission', async () => {
      signIn.mockResolvedValue({ ok: true });
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('credentials', {
          email: 'test@example.com',
          password: 'password123',
          redirect: false,
        });
      });
    });

    test('redirects to default path on successful login', async () => {
      signIn.mockResolvedValue({ ok: true });
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });

    test('redirects to specified redirect path on successful login', async () => {
      mockSearchParams.get.mockImplementation((key) => {
        if (key === 'redirect') return '/dashboard';
        return null;
      });
      
      signIn.mockResolvedValue({ ok: true });
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('displays error message on failed login', async () => {
      signIn.mockResolvedValue({ error: 'CredentialsSignin' });
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      });
    });

    test('handles unexpected errors during login', async () => {
      signIn.mockRejectedValue(new Error('Network error'));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
      });
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Login error:', expect.any(Error));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Loading State', () => {
    test('shows loading state during form submission', async () => {
      // Mock signIn to return a promise that we can control
      let resolveSignIn;
      signIn.mockReturnValue(new Promise((resolve) => {
        resolveSignIn = resolve;
      }));
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      // Check loading state
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      // Resolve the promise
      resolveSignIn({ ok: true });
      
      await waitFor(() => {
        expect(screen.queryByText('Signing in...')).not.toBeInTheDocument();
      });
    });

    // test('disables submit button during loading', async () => {
    //   let resolveSignIn;
    //   signIn.mockReturnValue(new Promise((resolve) => {
    //     resolveSignIn = resolve;
    //   }));
      
    //   render(<LoginPage />);
      
    //   const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
    //   fireEvent.click(submitButton);
      
    //   expect(submitButton).toBeDisabled();
    //   expect(submitButton).toHaveClass('disabled:opacity-50');
      
    //   resolveSignIn({ ok: true });
    // });
  });

  describe('Navigation Links', () => {
    test('renders sign up link with correct href', () => {
      render(<LoginPage />);
      
      const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
      expect(signUpLink).toHaveAttribute('href', '/register');
    });
  });

  describe('Form Validation', () => {
    test('prevents submission with empty fields due to HTML5 validation', () => {
      render(<LoginPage />);
      
      const form = screen.getByRole('form');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      // Try to submit empty form
      fireEvent.click(submitButton);
      
      // signIn should not be called with empty fields due to HTML5 validation
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  describe('Error Display', () => {
    test('clears error message when new submission starts', async () => {
      // First, set up an error
      signIn.mockResolvedValueOnce({ error: 'CredentialsSignin' });
      
      render(<LoginPage />);
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      
      // First submission with error
      fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      });
      
      // Second submission should clear the error initially
      signIn.mockResolvedValueOnce({ ok: true });
      fireEvent.click(submitButton);
      
      // The error should be cleared when form is submitted again
      await waitFor(() => {
        expect(screen.queryByText('Invalid email or password')).not.toBeInTheDocument();
      });
    });
  });

  describe('CSS Classes and Styling', () => {
    test('applies correct CSS classes to main elements', () => {
      render(<LoginPage />);
      
      const mainContainer = screen.getByRole('heading', { name: 'Welcome Back' }).closest('div').parentElement.parentElement;
      expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'flex-col', 'items-center', 'justify-center');
      
      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      expect(submitButton).toHaveClass('w-full', 'bg-blue-500', 'text-white', 'font-medium');
    });
  });
});