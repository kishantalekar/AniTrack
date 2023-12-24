// import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
// import icoMoonConfig from '../../selection.json';
// export default createIconSetFromIcoMoon(icoMoonConfig);

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface iconInterface {
  name: string;
  size: number;
  color: string;
}
export const AntDesignIcon: React.FC<iconInterface> = ({name, size, color}) => (
  <AntDesign name={name} size={size} color={color} />
);
export const FeatherIcon: React.FC<iconInterface> = ({name, size, color}) => (
  <Feather name={name} size={size} color={color} />
);
export const IoniconsIcon: React.FC<iconInterface> = ({name, size, color}) => (
  <Ionicons name={name} size={size} color={color} />
);
export const EntypoIcons: React.FC<iconInterface> = ({name, size, color}) => (
  <Entypo name={name} size={size} color={color} />
);
export const MaterialCommunityIconsIcons: React.FC<iconInterface> = ({
  name,
  size,
  color,
}) => <MaterialCommunityIcons name={name} size={size} color={color} />;
