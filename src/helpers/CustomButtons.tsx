import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {MaterialCommunityIconsIcons} from '../components/CustomIcon';

interface SignInSignOutButtonInterface {
  title: string;
  handleClick: any;
}
export const SignInSignOutButton: React.FC<SignInSignOutButtonInterface> = ({
  title,
  handleClick,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primaryRedHex,
        paddingVertical: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
      }}
      onPress={handleClick}>
      <Text
        style={{
          color: COLORS.primaryWhiteHex,
          fontSize: FONTSIZE.size_16,
          fontFamily: FONTFAMILY.poppins_regular,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface TextInputHolderInterface {
  placeholder: string;
  logo: string;
  setActiveFocus: any;
  activeFocus: number;
  id?: number;
  value: string;
  setValue: any;
  type?: string;
}
export const TextInputHolder: React.FC<TextInputHolderInterface> = ({
  placeholder,
  logo,
  setActiveFocus,
  activeFocus,
  id,
  value,
  setValue,
  type,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.secondaryDarkGreyHex,
        borderRadius: BORDERRADIUS.radius_15,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10 - 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_10,
        borderColor: COLORS.primaryRedHex,
        borderWidth: activeFocus === id ? 1 : 0,
      }}>
      <MaterialCommunityIconsIcons
        name={logo}
        size={FONTSIZE.size_18}
        color={COLORS.secondaryLightGreyHex}
      />
      <TextInput
        onFocus={() => setActiveFocus(id)}
        placeholder={placeholder}
        style={{
          fontSize: FONTSIZE.size_16,
          color: COLORS.primaryWhiteHex,

          flex: 1,
        }}
        placeholderTextColor={COLORS.secondaryLightGreyHex}
        value={value}
        onChangeText={v => setValue(v)}
      />
    </View>
  );
};
