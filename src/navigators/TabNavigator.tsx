import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import {COLORS, FONTSIZE} from '../theme/theme';
import {FeatherIcon, AntDesignIcon} from '../components/CustomIcon';

import {StyleSheet} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AntDesignIcon
              name="home"
              size={25}
              color={
                focused ? COLORS.champagneMist : COLORS.secondaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AntDesignIcon
              name="calendar"
              size={25}
              color={
                focused ? COLORS.champagneMist : COLORS.secondaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FeatherIcon
              name="bookmark"
              size={25}
              color={
                focused ? COLORS.champagneMist : COLORS.secondaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <AntDesignIcon
              name="user"
              size={25}
              color={
                focused ? COLORS.champagneMist : COLORS.secondaryLightGreyHex
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: COLORS.primaryblack,
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
