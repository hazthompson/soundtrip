import { gql } from '@apollo/client';

export const EVENTS_QUERY = gql`
  query Events($startDate: ISO8601DateTime, $lat: String!, $lng: String!) {
    events(startDate: $startDate, lat: $lat, lng: $lng) {
      artistName
      venue
      url
      imageUrl
      date
    }
  }
`;
