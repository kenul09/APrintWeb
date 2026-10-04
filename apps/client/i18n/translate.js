// Pure translator used on both the server (pages, metadata) and the client
// (I18nProvider). `t` resolves a dotted key and fills {name} placeholders;
// a missing key returns the key itself so gaps are visible, not silent.
const EMPTY_LIST = Object.freeze([]);

export function createTranslator(dict) {
  function t(keyPath, vars) {
    let node = dict;
    for (const part of keyPath.split(".")) {
      if (node == null) return keyPath;
      node = node[part];
    }
    if (node == null) return keyPath;
    if (vars && typeof node === "string") {
      return node.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match));
    }
    return node;
  }

  // For values that are mapped over — a missing list renders nothing
  // instead of crashing on keyPath.map.
  function tList(keyPath) {
    const value = t(keyPath);
    return Array.isArray(value) ? value : EMPTY_LIST;
  }

  return { t, tList };
}
