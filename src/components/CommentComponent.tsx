import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

const CommentComponent = ({}: any) => {
  return (
    <View
      style={{
        paddingHorizontal: SPACING.space_15,
        marginTop: SPACING.space_15,
        flexDirection: 'row',
      }}>
      <Text style={{color: COLORS.primaryWhiteHex}}>Comment component</Text>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({});
