import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AntDesignIcon} from './CustomIcon';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const Header = ({title, handleClick}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.space_20,
        position: 'absolute',
        top: 40,
        zIndex: 999,
      }}>
      <View
        style={{
          flexDirection: 'row',
          overflow: 'hidden',
          alignItems: 'center',
          flex: 1,
          gap: SPACING.space_20,
          marginLeft: 10,
        }}>
        <View>
          <Image
            source={require('../assets/app_images/logo.png')}
            style={{height: 25, width: 25}}
          />
        </View>

        <Text
          style={{
            color: COLORS.primaryWhiteHex,
            fontSize: FONTSIZE.size_24,
            fontFamily: FONTFAMILY.poppins_semibold,
          }}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={handleClick}>
        <AntDesignIcon
          name={'search1'}
          color={COLORS.primaryWhiteHex}
          size={FONTSIZE.size_24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
