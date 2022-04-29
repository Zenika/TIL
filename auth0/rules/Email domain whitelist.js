function emailDomainWhitelist(user, context, callback) {
  const encodedRedirectUrl = encodeURIComponent(`##FRONTEND_URL##?p=1&msg=access_denied`);
  const logoutUrl = `https://##AUTH0_DOMAIN##/v2/logout?returnTo=${encodedRedirectUrl}&client_id=${context.clientID}`;
  if (!user.email || !user.email_verified) {
    context.redirect = { url: logoutUrl };
    return callback(null, user, context);
  }

  const whitelist = ['zenika.com']; //authorized domains
  const userHasAccess = whitelist.some(function (domain) {
    const emailSplit = user.email.split('@');
    return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
  });

  if (!userHasAccess) {
    context.redirect = { url: logoutUrl };
    return callback(null, user, context);
  }

  return callback(null, user, context);
}