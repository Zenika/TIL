function (user, context, callback) {
  const userId = user.user_id;
  const username = user.nickname;
  
  const admin_secret = configuration.HASURA_ADMIN_SECRET;
  const url = configuration.HASURA_URL;
  const query = `mutation ($userId: String!, $username: String) {
        insert_user(objects: {id: $userId, username: $username}, on_conflict: {constraint: user_pkey}) {
            affected_rows
        }
    }`;

  const variables = {
    userId,
    username,
  };

  request.post({
      url: url,
      headers: {'content-type' : 'application/json', 'x-hasura-admin-secret': admin_secret},
      body: JSON.stringify({
        query: query,
        variables: variables
      })
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}