import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession, signOut } from 'next-auth/react';
import Navigation from './navigation';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Unauthenticated State', () => {
    beforeEach(() => {
      useSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });
    });

    test('should render basic navigation links when unauthenticated', () => {
      render(<Navigation />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.queryByText('Cart')).not.toBeInTheDocument();
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      expect(screen.queryByText('Settings')).not.toBeInTheDocument();
      expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });

    // test('should not highlight any link when on an unknown path', () => {
    //   render(<Navigation />);
      
    //   // Since there's no active state styling in the current implementation,
    //   // we just verify that all links are rendered without active classes
    //   const homeLink = screen.getByText('Home').closest('a');
    //   const aboutLink = screen.getByText('About').closest('a');
    //   const loginLink = screen.getByText('Login').closest('a');
      
    //   expect(homeLink).not.toHaveClass('active');
    //   expect(aboutLink).not.toHaveClass('active');
    //   expect(loginLink).not.toHaveClass('active');
    // });

    // test('should have correct href attributes for navigation links', () => {
    //   render(<Navigation />);
      
    //   expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    //   expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about');
    //   expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
    // });
  });

  describe('Authenticated State', () => {
    const mockSession = {
      user: {
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'https://example.com/avatar.jpg',
      },
    };

    beforeEach(() => {
      useSession.mockReturnValue({
        data: mockSession,
        status: 'authenticated',
      });

      fetch.mockResolvedValue({
        json: () => Promise.resolve([
          {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            role: 'user',
            avatar: 'https://example.com/user-avatar.jpg',
          },
        ]),
      });
    });

    test('should render navigation links for authenticated users', () => {
      render(<Navigation />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Cart')).toBeInTheDocument();
      // expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    test('should render user avatar when authenticated', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatar = screen.getByAltText('Avatar');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', mockSession.user.avatar);
      });
    });

    test('should fetch user data on mount when authenticated', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/users');
      });
    });

    test('should toggle dropdown when avatar is clicked', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        expect(avatarButton).toBeInTheDocument();
      });

      const avatarButton = screen.getByAltText('Avatar').closest('button');
      
      // Initially dropdown should not be visible
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      
      // Click to open dropdown
      fireEvent.click(avatarButton);
      
      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
      });
      
      // Click again to close dropdown
      fireEvent.click(avatarButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });

    test('should display user information in dropdown', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        fireEvent.click(avatarButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
      });
    });

    test('should call signOut when Sign Out button is clicked', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        fireEvent.click(avatarButton);
      });

      const signOutButton = screen.getByText('Sign Out');
      fireEvent.click(signOutButton);
      
      expect(signOut).toHaveBeenCalledTimes(1);
    });

    test('should show Profile link for regular users', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        fireEvent.click(avatarButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile');
      });
    });
  });

  describe('Admin User', () => {
    const mockAdminSession = {
      user: {
        email: 'admin@example.com',
        name: 'Admin User',
        avatar: 'https://example.com/admin-avatar.jpg',
      },
    };

    beforeEach(() => {
      useSession.mockReturnValue({
        data: mockAdminSession,
        status: 'authenticated',
      });

      fetch.mockResolvedValue({
        json: () => Promise.resolve([
          {
            id: 1,
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            avatar: 'https://example.com/admin-avatar.jpg',
          },
        ]),
      });
    });

    test('should show Dashboard link for admin users', async () => {
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        fireEvent.click(avatarButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      useSession.mockReturnValue({
        data: null,
        status: 'loading',
      });
    });

    test('should render basic navigation during loading', () => {
      render(<Navigation />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.queryByText('Cart')).not.toBeInTheDocument();
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      useSession.mockReturnValue({
        data: {
          user: {
            email: 'test@example.com',
            name: 'Test User',
            avatar: 'https://example.com/avatar.jpg',
          },
        },
        status: 'authenticated',
      });
    });

    test('should handle fetch error gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValue(new Error('API Error'));
      
      render(<Navigation />);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch user data:', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });

    test('should use session data when user data is not found', async () => {
      fetch.mockResolvedValue({
        json: () => Promise.resolve([]), // Empty users array
      });
      
      render(<Navigation />);
      
      await waitFor(() => {
        const avatarButton = screen.getByAltText('Avatar').closest('button');
        fireEvent.click(avatarButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    beforeEach(() => {
      useSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });
    });

    test('should have responsive classes', () => {
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-white', 'dark:bg-gray-900', 'shadow-md', 'p-4', 'rounded-xl', 'mx-4', 'mt-4', 'border', 'dark:border-gray-800');
      
      const container = nav.querySelector('.max-w-screen-xl');
      expect(container).toHaveClass('mx-auto', 'flex', 'flex-wrap', 'justify-between', 'items-center', 'gap-4');
    });
  });
});