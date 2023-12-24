import {
  FlatList,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {FeatherIcon, IoniconsIcon} from '../components/CustomIcon';

import useStore from '../store/store';
import {appWriteDB, appwrite} from '../appwrite/services';
import {Query} from 'appwrite';
import {addComment, getComments} from '../appwrite/db';
import CommentCard from '../components/CommentCard';

const CommentScreen = ({navigation, route}: any) => {
  const {id} = route.params;

  //states
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState<any>({});

  //store
  const user = useStore((state: any) => state.user);
  // console.log(user);
  const isLogged = Object.keys(user).length > 0;

  const handleAddComment = async () => {
    try {
      const res = await addComment({
        commentValue,
        isLogged,
        user_id: user['$id'],
        post_id: id,
        name: user.name,
      });

      if (res) {
        // Do something when the comment is successfully added
        setCommentValue('');
        // console.log('comment added successfully');
        handleGetComments(id);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const handleGetComments = async (post_id: string) => {
    try {
      const res = await getComments(post_id);
      if (res) {
        setComments(res);
      }
    } catch (error) {
      console.log('error getting the comments : ', error);
    }
  };

  useEffect(() => {
    handleGetComments(id);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={styles.statusBar.backgroundColor} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <IoniconsIcon
            name={'arrow-back'}
            size={FONTSIZE.size_30}
            color={COLORS.primaryWhiteHex}
          />
        </TouchableOpacity>
        <View style={{marginLeft: SPACING.space_20}}>
          <Text style={styles.headerText}>
            {Object.keys(comments).length > 0 ? comments?.total : '0'} Comments
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={comments?.documents}
          contentContainerStyle={{
            padding: SPACING.space_15,
            paddingBottom: SPACING.space_30 * 4,
          }}
          renderItem={({item}) => (
            <CommentCard item={item} handleGetComments={handleGetComments} />
          )}
          keyExtractor={item => item['$id']}
        />
      </View>
      <View style={styles.commentContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Add comment..."
              placeholderTextColor={COLORS.secondaryLightGreyHex}
              style={styles.textInput}
              value={commentValue}
              onChangeText={e => setCommentValue(e)}
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleAddComment}>
            <FeatherIcon
              name="send"
              size={FONTSIZE.size_20}
              color={COLORS.primaryWhiteHex}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlack,
    flex: 1,
    paddingVertical: SPACING.space_20,
    position: 'relative',
  },
  statusBar: {
    backgroundColor: COLORS.darkBlack,
  },
  header: {
    marginTop: SPACING.space_24,
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: SPACING.space_15,
  },
  backIcon: {
    marginRight: SPACING.space_20,
  },
  headerText: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  commentContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    borderTopWidth: 2,
    borderColor: COLORS.secondaryGreyHex,
    borderTopEndRadius: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderTopStartRadius: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    width: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.darkBlack,
  },
  inputContainer: {
    padding: SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  textInput: {
    backgroundColor: COLORS.secondaryGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    flex: 1,
    paddingLeft: SPACING.space_15,
    color: COLORS.primaryWhiteHex,
  },
  sendButton: {
    backgroundColor: COLORS.primaryRedHex,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
  },
});
