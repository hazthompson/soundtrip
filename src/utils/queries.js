import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
  query Events($startDate: ISO8601DateTime) {
    events(startDate: $startDate) {
      artistName
      venue
      url
      imageUrl
      date
    }
  }
`;
