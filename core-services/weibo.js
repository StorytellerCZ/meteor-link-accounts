if (Meteor.isClient) {
  Meteor.linkWithWeibo = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }

    var weiboPackage;
    if (Package.weibo) {
      weiboPackage = Package.weibo;
    } else if (Package['weibo-oauth']) {
      weiboPackage = Package['weibo-oauth'];
    }

    if (!Package['accounts-weibo'] || !weiboPackage) {
      throw new Meteor.Error(403, 'Please include accounts-weibo and weibo package')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    weiboPackage.Weibo.requestCredential(options, credentialRequestCompleteCallback);
  };
}
