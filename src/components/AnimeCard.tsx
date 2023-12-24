import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {MaterialCommunityIconsIcons} from './CustomIcon';
import {toggleFavouritesList} from '../appwrite/db';
import useStore from '../store/store';

interface AnimeCardInterface {
  name: string;
  url: string;
  img_src: string;
  tick_rate?: string;
  tick_quality?: string;
  page?: string;
  handleDelete?: any;
}
const CARD_WIDTH = Dimensions.get('window').width * 0.42;

const AnimeCard: React.FC<AnimeCardInterface> = ({
  name,
  url,
  img_src,
  tick_rate,
  tick_quality,
  page,
  handleDelete,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fallBackImage, setFallBackImage] = useState(false);
  const user = useStore((state: any) => state.user);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (error: any) => {
    console.log(error);
    console.log(error.message);
    setIsLoading(false);
    // Handle image loading error if needed
    setFallBackImage(true);
  };

  return (
    <View style={styles.CardContainer}>
      {isLoading && (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={CARD_WIDTH}
            height={CARD_WIDTH}
            borderRadius={10}
          />
        </SkeletonPlaceholder>
      )}

      <Image
        source={{uri: img_src}}
        style={styles.CardBackgroundImages}
        resizeMode="cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {fallBackImage && (
        <Image
          source={require('./../assets/app_images/zoro.jpeg')}
          style={styles.CardBackgroundImages}
          resizeMode="cover"
        />
      )}

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.ratingText}>
            {tick_rate ? tick_rate : 'PG - 13'}
          </Text>
        </View>
        <View>
          {page === 'fav' ? (
            <TouchableOpacity
              onPress={() =>
                handleDelete({user_id: user?.$id, name, img_src, url})
              }>
              <MaterialCommunityIconsIcons
                name={'delete'}
                size={FONTSIZE.size_24}
                color={COLORS.primaryRedHex}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.qualityText}>
              {tick_quality ? tick_quality : 'HD'}
            </Text>
          )}
        </View>
      </View>
      {/* <View style={styles.downInfoContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.ratingText}>PG-13</Text>
          <Text style={styles.ratingText}>PG-13</Text>
        </View>

        <Text style={styles.qualityText}>TV</Text>
      </View> */}
    </View>
  );
};

export default AnimeCard;

const styles = StyleSheet.create({
  CardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH + SPACING.space_24 * 2,
    elevation: 10,
    // backgroundColor: 'red',
  },
  CardBackgroundImages: {
    width: '100%',
    height: '100%',
    borderRadius: BORDERRADIUS.radius_10,
    position: 'absolute',
  },
  ratingText: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_10,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    elevation: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLORS.primaryblack,
  },
  qualityText: {
    backgroundColor: COLORS.champagneMist,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    elevation: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.darkBlack,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    flex: 1,
  },
  downInfoContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.space_10 - 5,
  },
});
