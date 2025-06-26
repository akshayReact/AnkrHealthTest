import { useEffect, useState } from 'react';
import { FlatList, Text, ActivityIndicator, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';
import { useDispatch, useSelector } from 'react-redux';
import { getJobsList, setSelectedJobData } from '@/apis/home/homeSlice';
import { RootState } from '@/store/rootReducers';
import JobItemCard from './Components/JobItemCard';
import text from '@/theme/text';
import { JobFilter, JobPosting } from '@/navigation/types';
import { CommonActions } from '@react-navigation/native';
import { FILTER_JOB_TYPE, FILTER_JOB_TYPE_OPTIONS } from '@/Constants';
import TextBox from '@/components/atoms/TextBox/TextBox';
import DropDownPicker from 'react-native-dropdown-picker';

const MAX_RANDOM_ID = 9;
let navigateTimer: any = null;
let loadMoreTimer: any = null;

function Home({ navigation }) {
  const { homeJobs, isLoading, nextPageUrl } = useSelector(
    (state: RootState) => state.home
  );
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState(homeJobs)
  const [filters, setFilters] = useState<JobFilter>({
    page: 1
  });
  const [isEndReached, setIsEndReached] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(FILTER_JOB_TYPE_OPTIONS)
  const {
    fonts,
    gutters,
    layout,
  } = useTheme();

  useEffect(() => {
    dispatch(getJobsList(filters))
  }, [filters])

  useEffect(() => {
    setJobList(homeJobs)
  }, [homeJobs])

  useEffect(() => {
    if (value) {
      onSelectFilter(value);
    }
  }, [value])

  const handleEndReached = () => {
    if (jobList.length > 10) {
      clearTimeout(loadMoreTimer);
      setIsEndReached(true)
      loadMoreTimer = setTimeout(() => {
        setFilters(prevState => {
          return {
            ...prevState,
            page: prevState.page + 1
          }
        });
        setIsEndReached(false);
      }, 1500)
    }
  };

  const handleJobItemPress = async (jobItem: JobPosting) => {
    clearTimeout(navigateTimer)
    await dispatch(setSelectedJobData(jobItem))
    navigateTimer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.navigate({
          name: "jobDetails",
        })
      );
    }, 500)
  }

  const onSelectFilter = (filterValue: string) => {
    try {
      setFilters(prevState => {
        return {
          ...prevState,
          page: 1,
          jobType: filterValue
        }
      });
    } catch (err) {
      console.error(err)
    }
  }

  const onRemoveFilters = () => {
    setFilters({ page: 1 });
    setOpen(false);
    setValue(null);
    setItems(FILTER_JOB_TYPE);
  }

  const handleSearchTextChange = (txt: string) => {
    setSearchText(txt)
    const jobsPayload = homeJobs.filter(job =>
      job.company.toLocaleLowerCase().includes(txt.toLocaleLowerCase())
    );
    setJobList(jobsPayload)
  }

  return (
    <SafeScreen>
      <View style={[gutters.marginTop_40, gutters.marginBottom_16]}>
        <Text style={[fonts.size_24, fonts.gray800, fonts.bold, gutters.marginLeft_12]}>
          Anker Job Board
        </Text>
      </View>
      <View style={[layout.row, layout.itemsCenter, layout.justifyCenter, gutters.marginHorizontal_12, gutters.marginBottom_16]}>
        <TextBox
          hintText="Search by Company name"
          inputValue={searchText}
          handleInputChange={handleSearchTextChange}
        />
      </View>
      <View style={[layout.row, layout.itemsCenter, layout.justifyBetween, gutters.marginHorizontal_12, gutters.marginBottom_16]}>
        <Text style={[fonts.size_12, fonts.gray800]}>
          Filter By
        </Text>
        <DropDownPicker
          testID='job-filter-dropdown'
          open={open}
          style={[
            layout.inputFieldStyle,
            gutters.marginLeft_12,
            {
              height: 35,
              width: 240
            },
          ]}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <Text testID='selected-filter' style={{fontSize: 16, color: '#000'}}>{value}</Text>

      {
        filters.jobType ?
          <TouchableOpacity onPress={onRemoveFilters} testID="remove-filters">
            <Text style={styles.clickableText}>Remove Filters</Text>
          </TouchableOpacity>
          : null
      }
      {
        !jobList && isLoading ?
          <View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
            <ActivityIndicator
              size="large"
              color="#585856"
            />
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginTop_12]}
            >
              Loading Jobs. Please wait..
            </Text>
          </View>
          : ((!jobList && !isLoading) || (Array.isArray(jobList) && jobList.length == 0 && !isLoading)) ?
            <View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
              <Text
                style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
              >
                Nothing to show
              </Text>
            </View>
            :
            jobList && Array.isArray(jobList) && !isLoading ?
              <FlatList
                data={jobList}
                renderItem={({ item, index }) => (
                  <TouchableHighlight onPress={() => handleJobItemPress(item)} testID={`row-${(index + 1)}`}>
                    <JobItemCard jobItem={item} />
                  </TouchableHighlight>
                )}
                keyExtractor={(item) => {
                  return `${Math.random() * 10} ${item.id}`
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                onEndReached={({ distanceFromEnd }) => {
                  handleEndReached();
                }}
                onEndReachedThreshold={0.9} // Trigger when 50% of the list is scrolled
                initialNumToRender={10}
                ListFooterComponent={
                  <View
                    style={[
                      layout.row,
                      gutters.padding_12,
                      layout.justifyCenter,
                      layout.itemsCenter,
                      layout.fullWidth,
                      {
                        height: 60
                      }
                    ]}
                  >
                    {
                      isEndReached && nextPageUrl ?
                        <ActivityIndicator
                          size="small"
                          color="#585856"
                        />
                        :
                        isEndReached && !nextPageUrl ?
                          <Text
                            style={[
                              text.rowItemTitle,
                              {
                                color: "rgba(100, 100, 100, 1)",
                                fontWeight: 300,
                                fontSize: 16,
                              },
                            ]}
                          >
                            End of Results
                          </Text>
                          :
                          null
                    }
                  </View>
                }
              />
              :
              null
      }
    </SafeScreen>
  );
}

export default Home;

const styles = StyleSheet.create({
  dropdownText: { paddingLeft: 10, fontSize: 12 },
  clickableText: {
    color: '#1e90ff',
    fontSize: 16,
    textDecorationLine: 'underline',
    margin: 10
  }
})