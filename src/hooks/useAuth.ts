import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session/token
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // TODO: Implement token validation and user data fetching
          // For now, we'll just set a mock user
          setAuthState({
            user: {
              id: "1",
              email: "user@example.com",
              name: "Test User",
              role: "student",
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login API call
      // Mock login for now
      const mockUser = {
        id: "1",
        email,
        name: "Test User",
        role: "student",
      };

      localStorage.setItem("auth_token", "mock_token");
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement actual registration API call
      // Mock registration for now
      const mockUser = {
        id: "1",
        email,
        name,
        role: "student",
      };

      localStorage.setItem("auth_token", "mock_token");
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    register,
  };
};
