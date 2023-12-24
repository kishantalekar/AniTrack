import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Assuming featured_data and trending_data are part of the state
const useStore = create(
  persist(
    (set, get) => ({
      user: {},

      setUser: (res: any) =>
        set(
          produce(state => {
            state.user = res;
          }),
        ),
    }),
    {
      name: 'ani-track',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStore;
