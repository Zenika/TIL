import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import React from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import './Home.css';

const Home = ({ username }) => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const handleDescriptionChange = event => setDescription(event.target.value);

  const mutation = gql`
    mutation MyMutation(
      $description: String = "",
      $url: String!,
      $post_tag_insert_input: [post_tag_insert_input!]!
    ) {
      insert_post_one(
        object: {
          description: $description,
          url: $url,
          post_tags: { data: $post_tag_insert_input }
        }
      ) {
        add_post_to_rss
        save_title
      }
    }
  `
  const [mutateFunction, { loading, error }] = useMutation(mutation, {
    onCompleted: () => window.close()
  })

  const onPostClick = async () => {
    let post_tag_insert_input = [];

    tags.forEach((tag) => {
      post_tag_insert_input.push({
        tag: {
          data: { name: tag.toLowerCase() },
          on_conflict: {
            constraint: "tag_name_key",
            update_columns: ["blank"],
          },
        },
      });
    });

    let [{ url }] = await chrome.tabs.query({ active: true, currentWindow: true });

    mutateFunction({
      variables: {
        description,
        url,
        post_tag_insert_input
      }
    })
  }

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className='container'>
      <h3>Share as {username}</h3>
      <div className='form'>
        <InputTextarea className='form-item' onChange={handleDescriptionChange} value={description} autoResize placeholder='Description'></InputTextarea>
        <Chips className='form-item p-fluid' value={tags} onChange={(e) => setTags(e.value)} max='5' allowDuplicate={false} placeholder='Tags'></Chips>
        <Button className='form-item p-button-sm' label='Post' onClick={onPostClick} />
      </div>
    </div>
  )
};

export default Home;
