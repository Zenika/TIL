import { gql, useQuery } from '@apollo/client';
import React from 'react';

const Home = ({ username }) => {
  const query = gql`
    query MyQuery {
      post {
        url
        uuid
      }
    }
  `

  const { loading, error, data } = useQuery(query)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>izi {error.message}</p>;

  return data.post.map(({ url, uuid }) => (
    <div key={uuid}>
      <p>
        {url}
      </p>
    </div>
  ));
};

export default Home;
