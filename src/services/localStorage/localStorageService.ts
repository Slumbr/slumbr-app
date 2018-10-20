import { AsyncStorage } from "react-native";

const useIndexDb = __DEV__ && !!window.indexedDB;

interface API {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
}

let api: API;

// workaround due to https://github.com/facebook/react-native/issues/14101
if (useIndexDb) {
  const idb = require("idb-keyval");
  api = {
    get: idb.get,
    set: idb.set
  };
} else {
  api = {
    get: AsyncStorage.getItem,
    set: AsyncStorage.setItem
  };
}

export const get = api.get;
export const set = api.set;
