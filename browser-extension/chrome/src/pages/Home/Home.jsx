import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import React from 'react';

const Home = ({ username }) => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = event => setDescription(event.target.value);

  const mutation = gql`
    mutation MyMutation($description: String = "", $url: String!) {
      insert_post_one(object: {description: $description, url: $url}) {
        add_post_to_rss
      }
    }
  `
  const [mutateFunction, { loading, error }] = useMutation(mutation, {
    onCompleted: () => window.close()
  })

  const onPostClick = async () => {
    let [{ url }] = await chrome.tabs.query({ active: true, currentWindow: true });

    mutateFunction({
      variables: { description, url }
    })
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <textarea onChange={handleDescriptionChange} value={description}></textarea>
      <button onClick={onPostClick}>Post</button>
    </div>
  )
};

export default Home;
