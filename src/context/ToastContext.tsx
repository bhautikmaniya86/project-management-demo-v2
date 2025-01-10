import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

// Define the types
type ToastState = {
  open: boolean;
  message: string;
  severity: AlertColor; // 'success' | 'error' | 'warning' | 'info'
};

// ToastProvider Props
type ToastProviderProps = {
  children: ReactNode;
};

type ToastContextType = {
  showToast: (message: string, severity?: AlertColor) => void;
};

// Create Context
const ToastContext = createContext<ToastContextType | null>(null);

// Custom Provider Component
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info', // Options: 'success', 'error', 'warning', 'info'
  });

  const showToast = useCallback(
    (message: string, severity: AlertColor = 'info') => {
      setToast({ open: true, message, severity });
    },
    []
  );

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeToast} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

// Custom Hook for usage
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
