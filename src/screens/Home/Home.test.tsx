import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Home from './Home';
import { Provider } from 'react-redux';
import { createTestStore } from '@/Helpers';
import store from "@/store/store";
import { queryClient, storage } from '@/App';
import { ThemeProvider } from '@/theme';
import { QueryClientProvider } from '@tanstack/react-query';

describe('MyComponent', () => {

  it('renders input, dropdown, and flatlist', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Home />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );

    expect(getByTestId('search-input')).toBeTruthy();
  });


  it('filters list on search input', () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Home />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  });

  it('filters list on dropdown selection', async () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Home />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  });

  it('handles row press', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Home />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    );
  });
});