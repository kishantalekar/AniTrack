import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IoniconsIcon} from './CustomIcon';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HEIGHT = Dimensions.get('window').height * 0.4;

const ImageBackgroundInfo = ({img_src, handleNavigation}: any) => {
  return (
    <View>
      {!img_src ? (
        <SkeletonPlaceholder
          backgroundColor={COLORS.primaryblack}
          highlightColor={COLORS.darkBlack}>
          <SkeletonPlaceholder.Item
            height={HEIGHT}
            width={'100%'}
            backgroundColor={COLORS.primaryblack}></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <ImageBackground
          source={{uri: img_src}}
          style={styles.ImageBackground}
          resizeMode="cover">
          <TouchableOpacity
            onPress={handleNavigation}
            style={styles.iconContainer}>
            <IoniconsIcon
              name={'arrow-back'}
              size={FONTSIZE.size_30}
              color={COLORS.primaryWhiteHex}
            />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    height: HEIGHT,
  },
  iconContainer: {
    padding: SPACING.space_18,
    paddingTop: SPACING.space_36,
  },
});
export default ImageBackgroundInfo;
