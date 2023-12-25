import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {spotlight} from '../data';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {AntDesignIcon, IoniconsIcon} from './CustomIcon';
import {SearchUrl} from '../api/api';

const screenWidth = Dimensions.get('window').width;
const SpotLight = ({navigation}: any) => {
  const flatlistRef = useRef<any>();

  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {

  // },[])

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === spotlight.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data: any, index: any) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  const renderItem = ({item}: any) => {
    const handleRedirect = (url: string) => {
      url = url.substring(1);
      const searchUrl = SearchUrl(url);
      Linking.openURL(searchUrl)
        .then(() => {
          console.log(`Opened: ${url}`);
        })
        .catch(err => {
          console.error(`Error opening ${url}: ${err}`);
        });
    };
    return (
      <View style={styles.imagecontainer}>
        <ImageBackground
          source={{uri: item?.img}}
          style={styles.ImageBackground}
          onError={e => console.log(e.nativeEvent.error)}
          resizeMode="cover">
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.spotlightNumber}>
                {item.spotlight_number}
              </Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.watchNowButton}
                onPress={() => handleRedirect(item?.ur)}>
                <AntDesignIcon
                  name={'play'}
                  size={FONTSIZE.size_16}
                  color={COLORS.darkBlack}
                />
                <Text style={styles.watchNowText}>Watch now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsNowButton}
                onPress={() =>
                  navigation.navigate('detail', {
                    url: item.ur ? item.ur : item.url,
                  })
                }>
                <Text style={styles.detailText}>Details</Text>
                <IoniconsIcon
                  name={'chevron-forward-outline'}
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryWhiteHex}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(Math.round(index));
  };
  return (
    <View>
      <FlatList
        ref={flatlistRef}
        data={spotlight}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.spotlight_number.toString()}
        horizontal
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SpotLight;

const styles = StyleSheet.create({
  imagecontainer: {
    width: screenWidth,
    alignItems: 'center',
    // borderColor: COLORS.primaryWhiteHex,
    // borderBottomWidth: 2,
    marginBottom: SPACING.space_20,
    borderRadius: SPACING.space_30,
  },
  ImageBackground: {
    width: screenWidth,
    height: 250,
    borderRadius: SPACING.space_30,

    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    padding: SPACING.space_10,
  },
  spotlightNumber: {
    color: COLORS.champagneMist,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  name: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  watchNowButton: {
    backgroundColor: COLORS.champagneMist,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10 - 2,
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailsNowButton: {
    backgroundColor: COLORS.primaryLightGreyHex,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10 - 2,
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  watchNowText: {
    color: COLORS.darkBlack,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  detailText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
});
