// JobItem.js
import { JobPosting } from '@/navigation/types';
import { useTheme } from '@/theme';
import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

interface JobItemProps {
    jobItem: JobPosting
}

const JobItem = (props: JobItemProps) => {
    const { jobItem } = props;
    const {
        layout,
    } = useTheme();

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{jobItem.title}</Text>
            <View style={[layout.row, layout.justifyBetween, layout.itemsCenter, {
                flexWrap: 'wrap'
            }]}>
                <Text style={styles.company}>{jobItem.company}</Text>
                <Text style={[styles.company, { fontSize: 12 }]}>Posted on: {jobItem.created_at}</Text>
            </View>
            <Text style={styles.label}>Location: <Text style={styles.value}>{jobItem.location}</Text></Text>
            <Text style={styles.label}>Job Category: <Text style={styles.value}>{jobItem.job_category}</Text></Text>
            <Text style={styles.label}>Employment Type: <Text style={styles.value}>{jobItem.employment_type}</Text></Text>
            <Text style={styles.label}>Remote: <Text style={styles.value}>{jobItem.is_remote_work ? 'Yes' : 'No'}</Text></Text>
        </View>
    );
};

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

export default JobItem;
