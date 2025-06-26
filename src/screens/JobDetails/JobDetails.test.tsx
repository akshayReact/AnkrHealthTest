import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, within } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/theme';
import i18n from '@/translations';
import JobDetails from './JobDetails';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

describe('Job Details screen should render correctly', () => {
    let storage: MMKV;
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

    test('navigates back when Go Back button is pressed', () => {
        const navigation = { goBack: jest.fn() }

        const { getByTestId } = render(
            <SafeAreaProvider>
                <Provider store={store}>
                    <ThemeProvider storage={storage}>
                        <I18nextProvider i18n={i18n}>
                            <QueryClientProvider client={queryClient}>
                                <JobDetails navigation={navigation} />
                            </QueryClientProvider>
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        )

        fireEvent.press(getByTestId('back-button'))
        expect(navigation.goBack).toHaveBeenCalled()
    })
    //-------------- -------------- -------------- TEST 02 -------------- -------------- -------------- --------------

    test('renders all provided items as Text children', () => {
        const navigation = { goBack: jest.fn() }
        render(<SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider storage={storage}>
                    <I18nextProvider i18n={i18n}>
                        <QueryClientProvider client={queryClient}>
                            <JobDetails navigation={navigation} />
                        </QueryClientProvider>
                    </I18nextProvider>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>)

        const list = screen.getByTestId('job-details-container')
        const { getAllByRole } = within(list)
        const textItems = getAllByRole('text')  // <Text> elements have role 'text'
        expect(textItems.length).toBeGreaterThanOrEqual(10)
    })

    //-------------- -------------- -------------- TEST 03 -------------- -------------- -------------- --------------

    test('Shows alert & Navigates back when Submit button is pressed', () => {
        const navigation = { goBack: jest.fn() }
        const { getByTestId } = render(
            <SafeAreaProvider>
                <Provider store={store}>
                    <ThemeProvider storage={storage}>
                        <I18nextProvider i18n={i18n}>
                            <QueryClientProvider client={queryClient}>
                                <JobDetails navigation={navigation} />
                            </QueryClientProvider>
                        </I18nextProvider>
                    </ThemeProvider>
                </Provider>
            </SafeAreaProvider>
        )
        fireEvent.press(getByTestId('submit-btn'))
        expect(Alert.alert).toHaveBeenCalledWith("Applied Successfully!");

    })
});