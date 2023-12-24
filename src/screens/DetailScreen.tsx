import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAnimeByUrl} from '../api/api';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {AntDesignIcon, FeatherIcon} from '../components/CustomIcon';

import DetailsBottomComponent from '../components/DetailsBottomComponent';
import useStore from '../store/store';
import {isAddedToFavourites, toggleFavouritesList} from '../appwrite/db';

const HEIGHT = Dimensions.get('window').height * 0.4;
const DetailScreen = ({navigation, route}: any) => {
  let {url} = route.params;
  url = url.slice(1);
  //states
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [moreOrComment, setMoreOrComment] = useState(true);
  const [addToFav, setAddedToFav] = useState(false);

  const [favouriteList, setFavouriteList] = useState<any>([]);
  //getting data from server

  //store
  const user = useStore((state: any) => state.user);

  useEffect(() => {
    const getData = async () => {
      try {
        setData(await getAnimeByUrl(url));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    checkIfAdded();
  }, []);

  const handleAddToList = async () => {
    try {
      const favourite = {
        user_id: user.$id,
        url: url,
        img_src: data.img_src,
        name: data.name,
      };
      await toggleFavouritesList(favourite);
      checkIfAdded();
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfAdded = async () => {
    try {
      if (!user?.$id) return;

      const check = await isAddedToFavourites(url, user?.$id);
      setAddedToFav(check);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor="transparent" />
      {loading ? (
        <SkeletonPlaceholder
          backgroundColor={COLORS.primaryDarkGreyHex}
          highlightColor={COLORS.darkBlack}>
          <SkeletonPlaceholder.Item style={styles.imagePlaceholder} />
        </SkeletonPlaceholder>
      ) : Object.keys(data).length > 0 ? (
        <View style={{flex: 1}}>
          <ImageBackgroundInfo
            img_src={data.img_src}
            handleNavigation={() => {
              navigation.pop();
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              {data?.name?.length > 20
                ? data?.name.substr(0, 25) + '...'
                : data?.name}
            </Text>
            <TouchableOpacity
              style={[styles.bookmarkIcon]}
              onPress={handleAddToList}>
              <FeatherIcon
                name="bookmark"
                size={25}
                color={addToFav ? COLORS.champagneMist : COLORS.primaryWhiteHex}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{data?.tick_pg}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{data?.tick_quality}</Text>
            </View>
            <View style={styles.typeAndDurationContainer}>
              <View style={styles.dotSeparator}></View>
              <Text style={styles.typeDurationText}>
                {data?.anitype ? data?.ani_type : 'TV'}
              </Text>
              <View style={styles.dotSeparator}></View>
              <Text style={styles.typeDurationText}>
                {data?.ani_duration ? data?.ani_duration : '24m'}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.watchNowButton}>
              <AntDesignIcon
                name={'play'}
                color={styles.icon.color}
                size={styles.icon.fontSize}
              />
              <Text style={styles.buttonText}>Watch Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addToListButton}>
              <AntDesignIcon
                name={'plus'}
                color={styles.icon.color}
                size={styles.icon.fontSize}
              />
              <Text style={styles.buttonText}>Add to List</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.genreContainer}>
            <Text numberOfLines={1} style={styles.genreText}>
              Genre : {'\t'} {data?.addtional_info?.genre_list?.join(',')}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                color: COLORS.primaryWhiteHex,
                fontSize: FONTSIZE.size_10,
                fontFamily: FONTFAMILY.poppins_medium,
              }}>
              {data?.description}
            </Text>
          </View>
          <DetailsBottomComponent
            navigation={navigation}
            data={data.more_like_this}
            id={url}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: HEIGHT,
          }}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              fontSize: FONTSIZE.size_18,
              fontFamily: FONTFAMILY.poppins_medium,
            }}>
            No data found
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlack,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    height: HEIGHT,
  },
  contentContainer: {
    paddingHorizontal: SPACING.space_15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  bookmarkIcon: {
    marginLeft: 'auto',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    padding: SPACING.space_15,
  },
  categoryBadge: {
    borderColor: COLORS.champagneMist,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10 - 5,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10 - 8,
  },
  categoryText: {
    color: COLORS.champagneMist,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_10,
  },
  typeAndDurationContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    paddingHorizontal: SPACING.space_15,
  },
  typeDurationBadge: {
    borderColor: COLORS.champagneMist,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10 - 5,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10 - 8,
  },
  typeDurationText: {
    color: COLORS.champagneMist,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    marginVertical: SPACING.space_10,
  },
  watchNowButton: {
    backgroundColor: COLORS.champagneMist,
    flexDirection: 'row',
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.space_10,
  },
  addToListButton: {
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: 'row',
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.space_10,
  },
  buttonText: {
    color: COLORS.darkBlack,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  icon: {
    color: COLORS.darkBlack,
    fontSize: FONTSIZE.size_20,
  },
  genreContainer: {
    // flexDirection: 'row',
    paddingHorizontal: SPACING.space_15,
    gap: SPACING.space_10 - 2,
  },
  genreText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
