module.exports = function (obj, blacklist) {
  function replacer (key, val) {
    if (isValidForBuild(key, val)) {
      return val;
    } else {
      return undefined;
    }
  }

  function isValidForBuild (key, val) {
    if (isBlacklisted(key) || !isReferenceToGitRepo(key, val)) {
      return false;
    }

    return true;
  }

  function isBlacklisted (key) {
    return blacklist.has(key);
  }

  function isReferenceToGitRepo (key, val) {
    var isReference = (key === 'resolved');

    if (isReference && !isGitRepo(val)) {
      return false;
    }

    return true;
  }

  function isGitRepo (rep) {
    return /^git/.test(rep);
  }

  return JSON.stringify(obj, replacer, 2);
};
