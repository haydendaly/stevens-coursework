import { gql } from '@apollo/client';

const GET_UNSPLASH_IMAGES = gql`
  query {
    unsplashImages {
      id
      description
      url
      posterName
      userPosted
      binned
    }
  }
`;

const GET_BINNED_IMAGES = gql`
  query {
    binnedImages {
      id
      description
      url
      posterName
      userPosted
      binned
    }
  }
`;

const GET_USER_POSTED_IMAGES = gql`
  query {
    userPostedImages {
      id
      description
      url
      posterName
      userPosted
      binned
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deleteImage(id: $id) {
      id
    }
  }
`;

const EDIT_POST = gql`
  mutation changePost(
    $id: ID!
    $binned: Boolean
  ) {
    updateImage(
      id: $id
      binned: $binned
    ) {
      id
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost(
    $posterName: String!
    $description: String
    $url: String!
  ) {
    uploadImage(
      posterName: $posterName
      description: $description
      url: $url
    ) {
      id
    }
  }
`;

export default {
    GET_UNSPLASH_IMAGES,
    GET_BINNED_IMAGES,
    GET_USER_POSTED_IMAGES,
    DELETE_POST,
    EDIT_POST,
    CREATE_POST
};