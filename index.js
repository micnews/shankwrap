module.exports = function (obj, blacklist) {
  function replacer(key, val) {
    if (isValidForBuild(key, val)) {
      return val;
    } else {
      return undefined;
    }
  };

  function isValidForBuild(key, val) {
    if (isBlacklisted(key) || key === 'from' || !willResolveFromGitRepo(key, val)) {
        return false;
    }

    return true;
  };

  function isBlacklisted(key) {
    return blacklist.has(key);
  };

  function willResolveFromGitRepo(key, val) {
    if (key ==='resolved' && !isGitRepo(val) && this.from !== val) {
      return false;
    }

    return true;
  };

  function isGitRepo(rep) {
      return /^git/.test(rep);
  };

  return JSON.stringify(obj, replacer, 2);
};
