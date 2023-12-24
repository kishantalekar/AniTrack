import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {convertTimestamp} from '../helpers/helper';
import {AntDesignIcon, MaterialCommunityIconsIcons} from './CustomIcon';
import useStore from '../store/store';
import {appWriteDB} from '../appwrite/services';
import {deleteComment, toggleLike} from '../appwrite/db';

const CommentCard = ({item, handleGetComments}: any) => {
  const user = useStore((state: any) => state.user);
  const handleToggleLike = async () => {
    try {
      await toggleLike(item['$id'], user['$id']);
      await handleGetComments(item.post_id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment(item['$id']);
      // console.log(res);
      await handleGetComments(item.post_id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{gap: SPACING.space_10, paddingVertical: SPACING.space_15}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING.space_20,
        }}>
        <Image
          source={require('../assets/app_images/profile.jpeg')}
          style={{height: 50, width: 50, borderRadius: 100}}
        />
        <Text style={{color: COLORS.primaryWhiteHex, flex: 1}}>
          {item.name || 'ksihan'}
        </Text>
        {item.user_id === user['$id'] ? (
          <TouchableOpacity onPress={handleDeleteComment}>
            <MaterialCommunityIconsIcons
              name={'delete'}
              size={FONTSIZE.size_24}
              color={COLORS.primaryRedHex}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <Text style={{color: COLORS.primaryWhiteHex}}>{item.comment}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SPACING.space_15,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SPACING.space_10,
          }}
          onPress={handleToggleLike}>
          <AntDesignIcon
            name={item.liked_by.includes(user['$id']) ? 'heart' : 'hearto'}
            size={FONTSIZE.size_16}
            color={
              item.liked_by.includes(user['$id'])
                ? COLORS.primaryRedHex
                : COLORS.primaryWhiteHex
            }
          />
          <Text style={{color: COLORS.primaryWhiteHex}}>{item?.likes}</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.primaryWhiteHex,
            fontSize: FONTSIZE.size_12,
            fontFamily: FONTFAMILY.poppins_medium,
          }}>
          {convertTimestamp(item['$createdAt'])}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({});
