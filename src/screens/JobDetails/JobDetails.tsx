import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant, SubmitButton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducers';

function JobDetails({ navigation }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectedJob } = useSelector(
        (state: RootState) => state.home
    );
    const {
        colors,
        components,
        fonts,
        gutters,
        layout,
    } = useTheme();

    const handleBtnPress = async () => {
        await Alert.alert("Applied Successfully!");
        handleGoBack();
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <SafeScreen
            isError={false}
        >
            <View
                style={[
                    layout.row,
                    layout.justifyBetween,
                    layout.itemsCenter,
                    gutters.marginTop_16,
                    gutters.margin_12,
                ]}
            >
                <TouchableOpacity
                    onPress={() => handleGoBack()}
                    style={[components.buttonCircle]}
                    testID="back-button"
                >
                    <IconByVariant path="leftarrow" stroke={colors.purple500} height={18} width={18} />
                </TouchableOpacity>
                <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
                    Job Details
                </Text>
                <View></View>
            </View>
            <View style={[gutters.marginTop_40, gutters.marginBottom_16]}>
                <Text testID='selected-job-title' numberOfLines={2} style={[fonts.size_24, fonts.gray800, fonts.bold, gutters.marginLeft_12, {flexWrap: 'wrap'}]}>
                    {selectedJob?.title}
                </Text>
            </View>
            <View style={styles.card} testID='job-details-container'>
                <Text testID='job-title' style={styles.title}>{selectedJob?.title}</Text>
                <Text testID='job-company-name' style={styles.company}>{selectedJob?.company}</Text>
                <Text testID='job-location' style={styles.label}>Location: <Text style={styles.value}>{selectedJob?.location}</Text></Text>
                <Text testID='job-category' style={styles.label}>Job Category: <Text style={styles.value}>{selectedJob?.job_category}</Text></Text>
                <Text testID='job-employment-type' style={styles.label}>Employment Type: <Text style={styles.value}>{selectedJob?.employment_type}</Text></Text>
                <Text testID='job-is-remote' style={styles.label}>Remote: <Text style={styles.value}>{selectedJob?.is_remote_work ? 'Yes' : 'No'}</Text></Text>
                <Text testID='job-openings' style={styles.label}>Openings: <Text style={styles.value}>{selectedJob?.number_of_opening}</Text></Text>
                <Text testID='job-salary' style={styles.label}>Salary: <Text style={styles.value}>${selectedJob?.salary_from} - ${selectedJob?.salary_to}</Text></Text>
                <Text testID='job-deadline' style={styles.label}>Deadline: <Text style={styles.value}>{selectedJob?.application_deadline}</Text></Text>
                <Text testID='job-contact' style={styles.label}>Contact: <Text style={styles.value}>{selectedJob?.contact}</Text></Text>
                <Text testID='job-qualifications' style={styles.label}>Qualifications:</Text>
                {JSON.parse(selectedJob?.qualifications || '[]').map((q, index) => (
                    <Text key={index} style={styles.qualification}>• {q}</Text>
                ))}
            </View>
            <SubmitButton onPress={handleBtnPress} testID='submit-btn' />
        </SafeScreen>
    );
}

export default JobDetails;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 8,
        elevation: 2
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    company: {
        fontSize: 16,
        color: '#555',
        marginBottom: 6
    },
    label: {
        fontWeight: '600',
        marginTop: 4
    },
    value: {
        fontWeight: '400'
    },
    qualification: {
        marginLeft: 10,
        fontStyle: 'italic'
    }
});