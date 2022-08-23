function (user, context, callback) {
  const userId = user.user_id;
  const username = user.nickname;
  const profile_pic = user.picture;
  
  const admin_secret = configuration.HASURA_ADMIN_SECRET;
  const url = configuration.HASURA_URL;
  const query = `mutation ($userId: String!, $username: String, $profile_pic: String) {
        insert_user(objects: {id: $userId, username: $username, profile_pic: $profile_pic}, on_conflict: {
          constraint: user_pkey,
          update_columns: [profile_pic]
        }) {
            affected_rows
        }
    }`;

  const variables = {
    userId,
    username,
    profile_pic
  };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}