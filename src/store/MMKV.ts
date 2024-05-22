import {MMKV} from 'react-native-mmkv';

// keys
const USER_INFORMATION = '@USER_INFORMATION';
const USER_ACCESS_TOKEN = '@ACCESS_TOKEN';
const USER_REFRESH_TOKEN = '@REFRESH_TOKEN';

interface AnyObject {
  [key: string]: string | number | null | undefined | boolean;
}

export const storage = new MMKV();

const hasKey = (key: string) => {
  return storage.contains(key);
};

const getAllKeys = () => {
  return storage.getAllKeys();
};

const deleteKey = (key: string) => {
  return storage.delete(key);
};

const deleteAllKeys = () => {
  return storage.clearAll();
};

const setKey = (key: string, value: AnyObject | string | boolean) => {
  if (typeof value === 'string' || typeof value === 'boolean') {
    return storage.set(key, value);
  }
  return storage.set(key, JSON.stringify(value));
};

const getKey = (key: string) => {
  const getValues = storage.getString(key);
  return getValues;
};

export {
  hasKey,
  getAllKeys,
  deleteKey,
  deleteAllKeys,
  setKey,
  getKey,
  USER_INFORMATION,
  USER_REFRESH_TOKEN,
  USER_ACCESS_TOKEN,
};
