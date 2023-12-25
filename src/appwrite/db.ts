import {Databases, ID, Query} from 'appwrite';
import {appWriteDB} from './services';

const DATABASEID = '6587d8737077c244a08e';
const COLLECTIONID = '6587d87ce5dc01817da4';

export const addComment = async ({
  commentValue,
  isLogged,
  user_id,
  post_id,
  name,
}: any) => {
  if (commentValue === '' || !isLogged) {
    return Promise.reject('Invalid comment or not logged in');
  }

  try {
    const res = await appWriteDB.createDocument(
      DATABASEID,
      COLLECTIONID,
      ID.unique(),
      {
        comment: commentValue,
        likes: 0,
        user_id: user_id,
        post_id: post_id,
        name: name,
      },
    );

    return res;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

export const getComments = async (post_id: string) => {
  try {
    const res = await appWriteDB.listDocuments(DATABASEID, COLLECTIONID, [
      Query.equal('post_id', [post_id]),
      Query.orderDesc('$createdAt'),
    ]);
    return res;
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

export const toggleLike = async (commentId: string, user_id: string) => {
  try {
    const comment = await appWriteDB.getDocument(
      DATABASEID,
      COLLECTIONID,
      commentId,
    );

    const liked_by = comment.liked_by || [];

    if (liked_by.includes(user_id)) {
      const updatedLikedBy = liked_by.filter((id: string) => id != user_id);

      await appWriteDB.updateDocument(DATABASEID, COLLECTIONID, commentId, {
        liked_by: updatedLikedBy,
        likes: updatedLikedBy.length,
      });
    } else {
      const updatedLikedBy = [...liked_by, user_id];
      await appWriteDB.updateDocument(DATABASEID, COLLECTIONID, commentId, {
        liked_by: updatedLikedBy,
        likes: updatedLikedBy.length,
      });
    }
    console.log('done');
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const res = await appWriteDB.deleteDocument(
      DATABASEID,
      COLLECTIONID,
      commentId,
    );
  } catch (error) {
    throw error;
  }
};
const FAVOURITESCOLLECTION = '65883f9835eb0748b092';

export const toggleFavouritesList = async ({
  user_id,
  url,
  name,
  img_src,
}: any) => {
  try {
    // Check if the item is already in the favorites
    const existingFavorites = await appWriteDB.listDocuments(
      DATABASEID,
      FAVOURITESCOLLECTION,
      [Query.equal('url', url), Query.equal('user_id', user_id)],
    );
    // console.log(existingFavorites);
    if (existingFavorites.total === 0) {
      // If not, add it to favorites
      await appWriteDB.createDocument(
        DATABASEID,
        FAVOURITESCOLLECTION,
        ID.unique(),
        {
          user_id,
          url,
          img_src,
          name,
        },
      );
      // console.log('Item added to favorites:', {user_id, url, name, img_src});
    } else {
      // If it's already in favorites, delete the existing document
      const existingDocument = existingFavorites.documents[0];
      await appWriteDB.deleteDocument(
        DATABASEID,
        FAVOURITESCOLLECTION,
        existingDocument['$id'],
      );
      // console.log('Item deleted from favorites:', {user_id, url});
    }
  } catch (error) {
    console.error('Error toggling favorites:', error);
    throw error;
  }
};
export const isAddedToFavourites = async (url: string, user_id: string) => {
  try {
    // Query the favorites collection to check if the item exists
    const existingFavorites = await appWriteDB.listDocuments(
      DATABASEID,
      FAVOURITESCOLLECTION,
      [Query.equal('url', url), Query.equal('user_id', user_id)],
    );

    // If the total count of matching documents is greater than 0, the item is in favorites
    return existingFavorites.total > 0;
  } catch (error) {
    console.error('Error checking if added to favorites:', error);
    throw error;
  }
};

export const getAllFavorites = async (user_id: string) => {
  try {
    // Query the favorites collection to get all documents for the specified user_id
    const favorites = await appWriteDB.listDocuments(
      DATABASEID,
      FAVOURITESCOLLECTION,
      [Query.equal('user_id', user_id)],
    );

    // Return an array of favorite items
    return favorites.documents;
  } catch (error) {
    // console.error('Error getting all favorites:', error);
    throw error;
  }
};
