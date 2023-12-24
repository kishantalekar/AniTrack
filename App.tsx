import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import SearchScreen from './src/screens/SearchScreen';
import DetailScreen from './src/screens/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import CommentScreen from './src/screens/CommentScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen
          name="tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />
        <stack.Screen
          name="detail"
          component={DetailScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <stack.Screen
          name="search"
          component={SearchScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <stack.Screen
          name="comment"
          component={CommentScreen}
          options={{animation: 'slide_from_right'}}
        />
        <stack.Screen
          name="login"
          component={LoginScreen}
          options={{animation: 'slide_from_right'}}
        />
        <stack.Screen
          name="register"
          component={RegisterScreen}
          options={{animation: 'slide_from_right'}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
