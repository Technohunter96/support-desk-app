import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';

// Co sem dám, tak se mi zobrazí v redux devtools
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
});

