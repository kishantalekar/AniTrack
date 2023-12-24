import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AnimeCard from './AnimeCard';

const AnimeRow = ({navigation, data, title, page}: any) => {
  return (
    <>
      {page === 'details' ? (
        <></>
      ) : (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.headerSubtext}>See all</Text>
          </TouchableOpacity>
        </View>
      )}
      {data && data?.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.url}
          contentContainerStyle={styles.FlatListContainer}
          style={{marginHorizontal: SPACING.space_20}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('detail', {
                    url: item?.url,
                  });
                }}>
                <AnimeCard
                  name={item.name}
                  url={item.url}
                  img_src={item.img_src}
                  tick_quality={item.tick_quality}
                  tick_rate={item.tick_rate}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{color: COLORS.primaryWhiteHex}}>No data found</Text>
        </View>
      )}
    </>
  );
};

export default AnimeRow;

const styles = StyleSheet.create({
  headerText: {
    color: COLORS.champagneMist,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },

  FlatListContainer: {
    paddingVertical: SPACING.space_15,
    gap: SPACING.space_15,
  },
  headerSubtext: {
    color: COLORS.primaryWhiteHex,
    textDecorationLine: 'underline',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.space_20,
  },
});
