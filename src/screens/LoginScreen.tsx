import {
  DevSettings,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {
  IoniconsIcon,
  MaterialCommunityIconsIcons,
} from '../components/CustomIcon';
import {SignInSignOutButton, TextInputHolder} from '../helpers/CustomButtons';
import {appwrite} from '../appwrite/services';
import useStore from '../store/store';

const LoginScreen = ({navigation}: any) => {
  const [activeFocus, setActiveFocus] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state: any) => state.setUser);
  const handleLogin = async () => {
    if (!email || !password) return;

    const promise = appwrite.createEmailSession(email.trim(), password.trim());

    promise.then(
      function (response) {
        console.log(response); // Success
        appwrite
          .get()
          .then(res => {
            setUser(res);
            navigation.goBack();
          })
          .catch(err => console.log(err));
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: COLORS.darkBlack}}>
      <StatusBar backgroundColor={COLORS.darkBlack} />

      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={styles.iconContainer}>
        <IoniconsIcon
          name={'arrow-back'}
          size={FONTSIZE.size_30}
          color={COLORS.primaryWhiteHex}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginBottom: SPACING.space_15}}>
        <View style={{height: 150, width: 150}}>
          <Image
            source={require('../assets/app_images/logo.png')}
            style={{
              borderRadius: 100,
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: FONTSIZE.size_24,
            color: COLORS.primaryWhiteHex,
            fontFamily: FONTFAMILY.poppins_bold,
            textAlign: 'center',
          }}>
          Sign in
        </Text>
      </View>

      <View style={{marginHorizontal: SPACING.space_10, gap: SPACING.space_20}}>
        <TextInputHolder
          placeholder={'Email'}
          logo={'email'}
          activeFocus={activeFocus}
          setActiveFocus={setActiveFocus}
          id={2}
          value={email}
          setValue={setEmail}
        />
        <TextInputHolder
          placeholder={'password'}
          logo={'lock'}
          activeFocus={activeFocus}
          setActiveFocus={setActiveFocus}
          id={3}
          value={password}
          setValue={setPassword}
        />
        <SignInSignOutButton title={'Sign in'} handleClick={handleLogin} />
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.primaryWhiteHex,
          marginTop: SPACING.space_15,
          fontFamily: FONTFAMILY.poppins_regular,
          fontSize: FONTSIZE.size_14,
        }}>
        Don't have an account?{'\t\t'}
        <Text
          style={{color: COLORS.primaryRedHex}}
          onPress={() => navigation.push('register')}>
          Sign up
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  iconContainer: {
    // padding: SPACING.space_18,
    // paddingTop: SPACING.space_36,
    paddingHorizontal: SPACING.space_18,
    paddingTop: SPACING.space_10,
  },
});
