import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {SignInSignOutButton} from '../helpers/CustomButtons';
import {appwrite} from '../appwrite/services';
import {
  EntypoIcons,
  IoniconsIcon,
  MaterialCommunityIconsIcons,
} from '../components/CustomIcon';
import useStore from '../store/store';
import Header from '../components/Header';

const ProfileScreen = ({navigation}: any) => {
  // const [user, setUser] = useState<any>();
  const user = useStore((state: any) => state.user);
  const setUser = useStore((state: any) => state.setUser);

  // useEffect(() => {
  //   const getUser = () => {
  //     const promise = appwrite.get();

  //     promise
  //       .then(res => {
  //         console.log('hello', res);
  //       })
  //       .catch(err => console.log(err));
  //   };
  //   getUser();
  // }, []);

  const handleLogout = async () => {
    const promise = appwrite.deleteSession('current');

    promise
      .then(res => {})
      .catch(err => console.log(err))
      .finally(() => {
        setUser({});
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryblack,
        paddingHorizontal: SPACING.space_20,
      }}>
      <StatusBar backgroundColor={COLORS.primaryblack} />
      <Header title={'Profile'} handleClick={() => navigation.push('search')} />
      {Object.keys(user).length > 0 ? (
        <View style={{marginTop: 100}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SPACING.space_24,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                // borderRadius: 100,
                // backgroundColor: 'red',
              }}>
              <Image
                source={require('../assets/app_images/profile.jpeg')}
                style={{width: '100%', height: '100%', borderRadius: 100}}
              />
            </View>

            <View style={{gap: SPACING.space_16}}>
              <Text
                style={{
                  color: COLORS.primaryWhiteHex,
                  fontFamily: FONTFAMILY.poppins_bold,
                  fontSize: FONTSIZE.size_16,
                }}>
                {user?.name}
              </Text>
              <Text
                style={{
                  color: COLORS.primaryWhiteHex,
                  fontFamily: FONTFAMILY.poppins_medium,
                  fontSize: FONTSIZE.size_14,
                }}>
                {user?.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: SPACING.space_20 * 4,
              gap: SPACING.space_16 * 2,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: SPACING.space_20,
                paddingRight: SPACING.space_10,
              }}>
              <IoniconsIcon
                color={COLORS.primaryWhiteHex}
                name={'person-outline'}
                size={FONTSIZE.size_18}
              />
              <Text
                style={{
                  color: COLORS.primaryWhiteHex,
                  fontSize: FONTSIZE.size_18,
                  fontFamily: FONTFAMILY.poppins_medium,
                  flex: 1,
                }}>
                Edit profile
              </Text>
              <EntypoIcons
                color={COLORS.primaryWhiteHex}
                name={'chevron-right'}
                size={FONTSIZE.size_18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                gap: SPACING.space_20,
              }}
              onPress={() => handleLogout()}>
              <MaterialCommunityIconsIcons
                name={'logout'}
                size={FONTSIZE.size_18}
                color={COLORS.primaryRedHex}
              />
              <Text
                style={{
                  color: COLORS.primaryRedHex,
                  fontSize: FONTSIZE.size_18,
                  fontFamily: FONTFAMILY.poppins_medium,
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: COLORS.secondaryGreyHex,
            marginTop: 200,
            padding: SPACING.space_20,
            borderRadius: BORDERRADIUS.radius_15,
            gap: SPACING.space_10,
          }}>
          <Text
            style={{
              color: COLORS.primaryWhiteHex,
              fontFamily: FONTFAMILY.poppins_regular,
              fontSize: FONTSIZE.size_16,
            }}>
            My profile
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.poppins_light,
              fontSize: FONTSIZE.size_16 - 1,
              color: COLORS.primaryWhiteHex,
            }}>
            Sign in to synchronize your anime
          </Text>
          <SignInSignOutButton
            title={'continue'}
            handleClick={() => {
              navigation.push('login');
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
