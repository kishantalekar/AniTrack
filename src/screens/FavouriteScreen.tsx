import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStore from '../store/store';
import {getAllFavorites, toggleFavouritesList} from '../appwrite/db';
import AnimeCard from '../components/AnimeCard';
import {useFocusEffect} from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const FavouriteScreen = ({navigation}: any) => {
  //store
  const user = useStore((state: any) => state.user);
  const [favourites, setFavourites] = useState<any>([]);

  const getFavFromAppwrite = async () => {
    if (!user.$id) return;
    try {
      const data = await getAllFavorites(user.$id);
      setFavourites(data);
      // console.log(data);
    } catch (error) {
      console.log('Error fetching favorites:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getFavFromAppwrite();
    }, [user.$id]), // Add user.$id to the dependencies array
  );

  // The rest of your component logic

  const handleDelete = async ({user_id, name, img_src, url}: any) => {
    try {
      await toggleFavouritesList({user_id, url, name, img_src});
      getFavFromAppwrite();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryblack,
        paddingVertical: SPACING.space_15,
        gap: SPACING.space_20,
      }}>
      <StatusBar backgroundColor={COLORS.primaryblack} />
      <Header title={'My List'} handleClick={() => navigation.push('search')} />
      {favourites && favourites.length > 0 ? (
        <FlatList
          numColumns={2}
          data={favourites}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={{
            flexWrap: 'nowrap',
            gap: SPACING.space_18,
            marginHorizontal: 10,
          }}
          style={{marginTop: 60}}
          renderItem={({item}: any) => (
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
                page="fav"
                handleDelete={handleDelete}
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
            Looks like you have not added any fav
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
