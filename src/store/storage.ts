import {Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

const MMKVStorage = new MMKV();

const MMKVReduxStorage: Storage = {
  setItem: (key, value) => {
    MMKVStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = MMKVStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    MMKVStorage.delete(key);
    return Promise.resolve();
  },
};

export default MMKVReduxStorage;
