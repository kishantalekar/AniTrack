import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import DisplaySchedules from '../components/DisplaySchedules';
import {getSchedules} from '../api/api';
import Header from '../components/Header';

const ScheduleScreen = ({navigation}: any) => {
  const [active, setActive] = useState(0);
  const [schedule, setSchedule] = useState<any>([]);
  const [schedule_list, setSchedule_list] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSchedulesFromApi = async () => {
      try {
        const data = await getSchedules();
        // console.log(data);
        setSchedule(data);
        setSchedule_list(data[active]?.list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSchedulesFromApi();
  }, []);
  const handlechange = (index: number) => {
    setSchedule_list(schedule[index].list);
    setActive(index);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryblack,
        paddingHorizontal: SPACING.space_10,
      }}>
      <StatusBar backgroundColor={COLORS.darkBlack} />
      <Header
        title={'Schedule'}
        handleClick={() => navigation.push('search')}
      />
      {/* <Text
        style={{
          color: COLORS.primaryWhiteHex,
          paddingLeft: SPACING.space_20,
          fontSize: FONTSIZE.size_24,
          fontFamily: FONTFAMILY.poppins_bold,
          paddingVertical: 20,
        }}>
        Schedule{' '}
      </Text> */}

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={COLORS.champagneMist} />
        </View>
      ) : schedule && schedule.length > 0 ? (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{maxHeight: 100, marginTop: SPACING.space_18 + 10}}>
            <View
              style={{
                flexDirection: 'row',
                gap: SPACING.space_20,
                maxHeight: 100,
                marginBottom: SPACING.space_20,
                // backgroundColor: 'red',
              }}>
              {schedule?.map((data: any, i: number) => (
                <TouchableOpacity
                  key={data.day.toString()}
                  style={{
                    backgroundColor:
                      active === i
                        ? COLORS.champagneMist
                        : 'rgba(255,255,255,.05)',
                    height: SPACING.space_36 * 2,
                    maxHeight: 100,
                    justifyContent: 'center',
                    width: SPACING.space_36 * 2,
                    maxWidth: 100,
                    borderRadius: BORDERRADIUS.radius_10,
                  }}
                  onPress={() => handlechange(i)}>
                  <Text
                    style={{
                      color:
                        active === i
                          ? COLORS.darkBlack
                          : COLORS.primaryWhiteHex,
                      fontSize: FONTSIZE.size_18,
                      textAlign: 'center',
                    }}>
                    {data.day.substr(0, 3)}
                  </Text>
                  <Text
                    style={{
                      color:
                        active === i
                          ? COLORS.darkBlack
                          : COLORS.primaryWhiteHex,
                      fontSize: FONTSIZE.size_12,
                      textAlign: 'center',
                    }}>
                    {data.day.substr(3, data.day.length)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <DisplaySchedules schedule_list={schedule_list} />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              fontSize: FONTSIZE.size_18,
              fontFamily: FONTFAMILY.poppins_bold,
            }}>
            No schedule found
          </Text>
        </View>
      )}

      {/* <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
        {schedule[active]?.list?.map((item: any, i: number) => (
          <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: COLORS.secondaryLightGreyHex,
                  fontSize: FONTSIZE.size_14,
                  fontFamily: FONTFAMILY.poppins_semibold,
                }}>
                {item[0].time}
              </Text>
            </View>
            <View style={{flex: 3}}>
              <Text
                style={{
                  color: COLORS.primaryWhiteHex,
                  fontFamily: FONTFAMILY.poppins_medium,
                  fontSize: FONTSIZE.size_16,
                }}>
                {item[0].name}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: COLORS.primaryWhiteHex}}>
                {item[0].episode_no}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
