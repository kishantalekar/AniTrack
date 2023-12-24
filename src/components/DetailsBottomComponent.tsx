import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommentComponent from './CommentComponent';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AnimeRow from './AnimeRow';
import {getComments} from '../appwrite/db';

const DetailsBottomComponent = ({navigation, data, id}: any) => {
  const [moreOrComment, setMoreOrComment] = useState(true);
  const [commentTotal, setCommentTotal] = useState<any>(0);
  useEffect(() => {
    const getTotalComments = async () => {
      try {
        const res = await getComments(id);

        setCommentTotal(res.total);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalComments();
  }, []);
  return (
    <View style={{flexGrow: 1}}>
      <View
        style={{
          paddingHorizontal: SPACING.space_15,
          marginTop: SPACING.space_15,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            // borderColor: COLORS.darkBlack,
            borderBottomColor: COLORS.champagneMist,
            borderLeftColor: COLORS.darkBlack,
            borderRightColor: COLORS.darkBlack,
            borderTopColor: COLORS.darkBlack,
            borderWidth: 2,
          }}
          onPress={() => setMoreOrComment(true)}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              textAlign: 'center',
              fontFamily: FONTFAMILY.poppins_medium,
              fontSize: FONTSIZE.size_16,
            }}>
            More like this
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => navigation.push('comment', {id: id})}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              textAlign: 'center',
              fontFamily: FONTFAMILY.poppins_medium,
              fontSize: FONTSIZE.size_16,
            }}>
            Comments{commentTotal !== 0 ? `(${commentTotal})` : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: SPACING.space_15, flex: 1}}>
        {moreOrComment && (
          <AnimeRow navigation={navigation} page={'details'} data={data} />
        )}
      </View>
    </View>
  );
};

export default DetailsBottomComponent;

const styles = StyleSheet.create({});
