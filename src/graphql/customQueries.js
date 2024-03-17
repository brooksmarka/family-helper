export const searchListItems = /* GraphQL */ `
  query SearchLists(
    $filter: SearchableListFilterInput
    $sort: [SearchableListSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableListAggregationInput]
  ) {
    searchLists(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        listItems {
            items {
                id
                listID
                title
                quantity
                done
                createdAt
                updatedAt
                __typename
            }
        }
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;