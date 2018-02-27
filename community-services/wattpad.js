
if (Meteor.isClient) {
  Meteor.linkWithWattpad = function (options, callback) {
    if (!Meteor.userId()) {
      throw new Meteor.Error(402, 'Please login to an existing account before link.');
    }
    if(!Package['storyteller:accounts-wattpad']) {
      throw new Meteor.Error(403, 'Please include storyteller:accounts-wattpad package.')
    }

    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
    Package['storyteller:accounts-wattpad'].Wattpad.requestCredential(options, credentialRequestCompleteCallback);
  };
}
