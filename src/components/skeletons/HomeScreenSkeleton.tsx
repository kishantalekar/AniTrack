import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS} from '../../theme/theme';

const HomeScreenSkeleton = () => {
  return (
    <View style={{flex: 1}}>
      <SkeletonPlaceholder
        borderRadius={4}
        highlightColor={COLORS.primaryDarkGreyHex}
        backgroundColor={COLORS.secondaryDarkGreyHex}>
        <SkeletonPlaceholder.Item
          height={'100%'}
          width={'100%'}></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default HomeScreenSkeleton;

const styles = StyleSheet.create({});
