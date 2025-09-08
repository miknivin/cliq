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
 
      <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        {children}
      </Provider>
    </>
  );
}