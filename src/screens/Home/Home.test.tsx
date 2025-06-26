import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import Home from './Home';
import { Provider } from 'react-redux';
import store from "@/store/store";
import { queryClient } from '@/App';
import { ThemeProvider } from '@/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import JobDetails from '../JobDetails/JobDetails';
import renderer from 'react-test-renderer';

const Stack = createStackNavigator<RootStackParamList>();

describe('Home screen should render correctly', () => {
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
  //-------------- -------------- -------------- TEST 01 -------------- -------------- -------------- --------------
  test('Home page renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //-------------- -------------- -------------- TEST 02 -------------- -------------- -------------- --------------

  test('the user can click on job to see details', async () => {
     const component = (
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen component={Home} name={Paths.Home} />
                  <Stack.Screen component={JobDetails} name={Paths.JobDetails} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    );
    const { findByTestId } = render(component);
    const jobItem = await findByTestId(`row-1`);

    fireEvent.press(jobItem);
    await waitFor(() => {
      expect(store.getState().home.selectedJob).toBeTruthy();
    });

  });

  //-------------- -------------- -------------- TEST 03 -------------- -------------- -------------- --------------

  test('should update the Search Field value and display data when user types', () => {
     const component = (
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen component={Home} name={Paths.Home} />
                  <Stack.Screen component={JobDetails} name={Paths.JobDetails} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    );
    const { getByTestId } = render(component);
    const textInput = getByTestId('search-input');
    fireEvent.changeText(textInput, 'Cumminns');
    // TextInput value should get updated
    expect(textInput.props.value).toBe('Cumminns');
  });

    //-------------- -------------- -------------- TEST 04 -------------- -------------- -------------- --------------

    test('Filter Dropdown renders correctly & shows list of options on press', async () => {
       const component = (
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen component={Home} name={Paths.Home} />
                  <Stack.Screen component={JobDetails} name={Paths.JobDetails} />
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    );
    const { getByTestId } = render(component);
    const dropdown = getByTestId('job-filter-dropdown');
    fireEvent.press(dropdown); // Simulate opening the dropdown
    expect(getByTestId('job-filter-dropdown').props.children[0][0].props.children[1].props.children).toBe('Select an item');
  });
});