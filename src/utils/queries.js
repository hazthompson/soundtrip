import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
  query Events {
    events {
      artistName
      venue
      url
      imageUrl
      date
    }
  }
`;
