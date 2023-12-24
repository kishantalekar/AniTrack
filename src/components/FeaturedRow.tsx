import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useDebugValue, useEffect, useState} from 'react';
import {getFeaturedData} from '../api/api';
import useStore from '../store/store';
import AnimeRow from './AnimeRow';
import {COLORS} from '../theme/theme';

const FeaturedRow = ({navigation}: any) => {
  const [featured_data, setFeaturedData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const getFeaturedFromApi = async () => {
    setLoading(true);
    try {
      const data = await getFeaturedData();

      setFeaturedData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeaturedFromApi();
  }, []);
  return (
    <View style={{flex: 1}}>
      {!loading ? (
        <>
          <AnimeRow
            title={'Latest Completed'}
            data={featured_data['Latest Completed']}
            navigation={navigation}
          />
          <AnimeRow
            title={'Most Favorite'}
            data={featured_data['Most Favorite']}
            navigation={navigation}
          />
          <AnimeRow
            title={'Most Popular'}
            data={featured_data['Most Popular']}
            navigation={navigation}
          />
          <AnimeRow
            title={'Top Airing'}
            data={featured_data['Top Airing']}
            navigation={navigation}
          />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <Text style={{color: COLORS.primaryWhiteHex}}>No data available</Text> */}
          <ActivityIndicator color={COLORS.champagneMist} />
        </View>
      )}
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({});
