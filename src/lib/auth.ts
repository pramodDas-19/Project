// Simple authentication utilities for admin panel
// In a real application, this would use JWT tokens and secure API calls

export interface AdminUser {
  username: string;
  role: "admin";
  loginTime: number;
}

const AUTH_KEY = "propertyHub_admin_auth";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Valid admin credentials (in real app, this would be validated server-side)
const VALID_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const authUtils = {
  // Check if user is currently authenticated
  isAuthenticated(): boolean {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (!authData) return false;

      const { user, timestamp } = JSON.parse(authData);
      const now = Date.now();

      // Check if session has expired
      if (now - timestamp > SESSION_DURATION) {
        this.logout();
        return false;
      }

      return !!user;
    } catch {
      return false;
    }
  },

  // Get current authenticated user
  getCurrentUser(): AdminUser | null {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (!authData) return null;

      const { user, timestamp } = JSON.parse(authData);
      const now = Date.now();

      // Check if session has expired
      if (now - timestamp > SESSION_DURATION) {
        this.logout();
        return null;
      }

      return user;
    } catch {
      return null;
    }
  },

  // Authenticate user with credentials
  login(credentials: {
    username: string;
    password: string;
  }): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const { username, password } = credentials;

        // Validate credentials
        if (
          username === VALID_CREDENTIALS.username &&
          password === VALID_CREDENTIALS.password
        ) {
          const user: AdminUser = {
            username,
            role: "admin",
            loginTime: Date.now(),
          };

          // Store auth data in localStorage
          const authData = {
            user,
            timestamp: Date.now(),
          };

          localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

          resolve({ success: true, user });
        } else {
          resolve({
            success: false,
            error: "Invalid username or password",
          });
        }
      }, 1000);
    });
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  // Check if session is about to expire (within 1 hour)
  isSessionExpiringSoon(): boolean {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (!authData) return false;

      const { timestamp } = JSON.parse(authData);
      const now = Date.now();
      const timeLeft = SESSION_DURATION - (now - timestamp);

      return timeLeft < 60 * 60 * 1000; // Less than 1 hour left
    } catch {
      return false;
    }
  },

  // Extend session (refresh timestamp)
  extendSession(): void {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (!authData) return;

      const data = JSON.parse(authData);
      data.timestamp = Date.now();

      localStorage.setItem(AUTH_KEY, JSON.stringify(data));
    } catch {
      // Ignore errors
    }
  },

  // Get session time remaining in minutes
  getSessionTimeRemaining(): number {
    try {
      const authData = localStorage.getItem(AUTH_KEY);
      if (!authData) return 0;

      const { timestamp } = JSON.parse(authData);
      const now = Date.now();
      const timeLeft = SESSION_DURATION - (now - timestamp);

      return Math.max(0, Math.floor(timeLeft / (60 * 1000))); // Convert to minutes
    } catch {
      return 0;
    }
  },
};

// Hook to use authentication in React components
export const useAuth = () => {
  return {
    isAuthenticated: authUtils.isAuthenticated(),
    user: authUtils.getCurrentUser(),
    login: authUtils.login,
    logout: authUtils.logout,
    extendSession: authUtils.extendSession,
    isSessionExpiringSoon: authUtils.isSessionExpiringSoon(),
    sessionTimeRemaining: authUtils.getSessionTimeRemaining(),
  };
};
