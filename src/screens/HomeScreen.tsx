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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getFeaturedData, getTrendingData} from '../api/api';
import useStore from '../store/store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AnimeCard from '../components/AnimeCard';
import AnimeRow from '../components/AnimeRow';
import FeaturedRow from '../components/FeaturedRow';
import {featured_data} from '../data';
import HomeScreenSkeleton from '../components/skeletons/HomeScreenSkeleton';
import SpotLight from '../components/SpotLight';
const HomeScreen = ({navigation}: any) => {
  // const trending_data = useStore((state: any) => state.trending_data);
  const [trending_data, setTrendingData] = useState<any>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTrendingFromApi = async () => {
      try {
        setLoading(true);
        const data = await getTrendingData();

        setTrendingData(data.trending_data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingFromApi();
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      {loading ? (
        <HomeScreenSkeleton />
      ) : (
        <>
          {trending_data && trending_data.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: SPACING.space_20}}
              contentContainerStyle={styles.ScrollViewFlex}>
              <SpotLight navigation={navigation} />
              <AnimeRow
                title={'Trending'}
                data={trending_data}
                navigation={navigation}
              />

              <FeaturedRow
                navigation={navigation}
                featured_data={featured_data}
              />
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: FONTSIZE.size_18,
                  fontFamily: FONTFAMILY.poppins_regular,
                  color: COLORS.primaryWhiteHex,
                }}>
                Something went wrong...
              </Text>
              {/* <ActivityIndicator color={COLORS.champagneMist} /> */}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryblack,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    // paddingHorizontal: SPACING.space_20,
  },
  headerText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  anime_title: {
    color: COLORS.primaryWhiteHex,
  },
  FlatListContainer: {
    paddingVertical: SPACING.space_20,
    gap: SPACING.space_10,
  },
  headerSubtext: {
    color: COLORS.champagneMist,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
