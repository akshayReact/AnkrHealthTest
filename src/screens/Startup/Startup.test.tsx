import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/theme';
import i18n from '@/translations';
import Startup from './Startup';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

describe('Startup screen should render correctly', () => {
  let storage: MMKV;
  const mockNav = { navigate: jest.fn() };
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });
  beforeAll(() => {
    storage = new MMKV();
  });
  test('Splash screen renders correctly', () => {
    const component = (
      <SafeAreaProvider>
        <ThemeProvider storage={storage}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <Startup />
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    render(component);

    const splashContainer = screen.getByTestId('splash-screen-container');
    expect(splashContainer).toBeDefined();

    const splashTitle = screen.getByTestId('splash-screen-title');
    expect(splashTitle).toBeDefined();
  });
});