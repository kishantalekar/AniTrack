import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AntDesignIcon, IoniconsIcon} from '../components/CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {TextInputHolder} from '../helpers/CustomButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getSearchQueryData} from '../api/api';
import AnimeCard from '../components/AnimeCard';

const SearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryData, setSearchQueryData] = useState<any>([]);
  const handleSearch = async (e: string) => {
    try {
      const updatedSearchQuery = searchQuery.split(' ').join('+');

      const data = await getSearchQueryData(updatedSearchQuery);
      setSearchQueryData(data);
      // console.log(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.primaryblack, flex: 1}}>
      <StatusBar backgroundColor={COLORS.primaryblack} />
      <View
        style={{
          paddingHorizontal: SPACING.space_15,
          paddingVertical: SPACING.space_10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING.space_10,
          marginBottom: SPACING.space_15,
        }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <IoniconsIcon
            name={'arrow-back'}
            size={FONTSIZE.size_30}
            color={COLORS.primaryWhiteHex}
          />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: COLORS.primaryGreyHex,
            borderRadius: BORDERRADIUS.radius_20,
            paddingHorizontal: SPACING.space_15,
            paddingVertical: SPACING.space_10 - 5,
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING.space_10,
            borderColor: COLORS.primaryRedHex,
            flex: 1,
          }}>
          <AntDesignIcon
            name={'search1'}
            color={COLORS.primaryWhiteHex}
            size={FONTSIZE.size_24}
          />
          <TextInput
            placeholder="Search"
            style={{
              fontSize: FONTSIZE.size_16,
              color: COLORS.primaryWhiteHex,
              flex: 1,
            }}
            value={searchQuery}
            onChangeText={e => {
              setSearchQuery(e);
              handleSearch(e);
            }}
            placeholderTextColor={COLORS.secondaryLightGreyHex}
          />
        </View>
      </View>
      {searchQueryData && searchQueryData.length > 0 ? (
        <FlatList
          numColumns={2}
          data={searchQueryData}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{
            flexWrap: 'nowrap',
            gap: 10,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('detail', {
                  url: item?.url,
                });
              }}>
              <AnimeCard
                name={item.name}
                img_src={item.img_src}
                url={item.url}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              fontSize: FONTSIZE.size_18,
              fontFamily: FONTFAMILY.poppins_light,
            }}>
            Search for Your favorite anime
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
