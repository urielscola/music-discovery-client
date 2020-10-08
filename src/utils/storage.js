import store from 'store';

const buildKey = key => `music-discovery-${key}`;

export default {
  setItem: (key, value, exp) => {
    if (key) {
      store.set(buildKey(key), {
        value,
        exp: exp || null,
        iat: new Date().getTime()
      });

      return store.get(buildKey(key));
    }
    return null;
  },

  getItem: key => {
    const info = store.get(buildKey(key));

    if (!info) return null;

    if (info.exp && new Date().getTime() > info.exp) {
      store.remove(buildKey(key));
      return null;
    }

    return info.value;
  },

  removeItem: key => {
    const info = store.get(buildKey(key));
    if (!info) return null;

    return store.remove(buildKey(key));
  },

  clear: () => store.clearAll()
};
