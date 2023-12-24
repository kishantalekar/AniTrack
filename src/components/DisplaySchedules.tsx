import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {EntypoIcons} from './CustomIcon';

const DisplaySchedules = ({schedule_list}: any) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flexGrow: 1, marginTop: SPACING.space_10}}>
      {schedule_list?.map((itemList: any, i: number) =>
        itemList.map((item: any, j: number) => (
          <View key={i + j}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SPACING.space_10,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: COLORS.secondaryLightGreyHex,
                    fontSize: FONTSIZE.size_14,
                    fontFamily: FONTFAMILY.poppins_semibold,
                  }}>
                  {item.time}
                </Text>
              </View>
              <View style={{flex: 3}}>
                <Text
                  style={{
                    color: COLORS.primaryWhiteHex,
                    fontFamily: FONTFAMILY.poppins_regular,
                    fontSize: FONTSIZE.size_14,
                  }}>
                  {item.name.length > 25
                    ? item.name.substr(0, 20) + '...'
                    : item.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}>
                <EntypoIcons
                  name="controller-play"
                  color="grey"
                  size={FONTSIZE.size_14}
                />
                <Text style={{color: COLORS.primaryWhiteHex}}>
                  {item.episode_no}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderTopWidth: 1,
                borderColor: COLORS.secondaryGreyHex,
              }}
            />
          </View>
        )),
      )}
    </ScrollView>
  );
};

export default DisplaySchedules;

const styles = StyleSheet.create({});
