// L'application a été conçue à l'origine pour l'environnement "artifacts" de Claude,
// qui fournit une API window.storage persistante. Ce fichier reproduit la même API
// (get/set/delete/list) au-dessus de localStorage, pour que l'app fonctionne à
// l'identique en application web autonome et dans l'APK Android (Capacitor).
//
// Le paramètre "shared" (données partagées entre utilisateurs) n'a pas de sens hors
// de Claude : il est accepté pour compatibilité mais toujours traité comme local
// à l'appareil.

function safeParseKeyList(prefix) {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (!prefix || key.startsWith(prefix))) keys.push(key);
  }
  return keys;
}

window.storage = {
  async get(key, shared = false) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      return { key, value, shared: !!shared };
    } catch (e) {
      console.error("storage.get error", e);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      localStorage.setItem(key, value);
      return { key, value, shared: !!shared };
    } catch (e) {
      console.error("storage.set error", e);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      const existed = localStorage.getItem(key) !== null;
      localStorage.removeItem(key);
      return { key, deleted: existed, shared: !!shared };
    } catch (e) {
      console.error("storage.delete error", e);
      return null;
    }
  },

  async list(prefix = "", shared = false) {
    try {
      return { keys: safeParseKeyList(prefix), prefix, shared: !!shared };
    } catch (e) {
      console.error("storage.list error", e);
      return null;
    }
  },
};
