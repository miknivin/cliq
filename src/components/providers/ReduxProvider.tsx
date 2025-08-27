'use client';
import store from '@/app/redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        {children}
      </Provider>
    </>
  );
}