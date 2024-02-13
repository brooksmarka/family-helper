/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      title
      description
      listItems {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getListItem = /* GraphQL */ `
  query GetListItem($id: ID!) {
    getListItem(id: $id) {
      id
      listID
      title
      quantity
      done
      list {
        id
        title
        description
        createdAt
        updatedAt
        __typename
      }
      actions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listListItems = /* GraphQL */ `
  query ListListItems(
    $filter: ModelListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      __typename
    }
  }
`;
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
      id
      listItemID
      action
      listItem {
        id
        listID
        title
        quantity
        done
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        listItemID
        action
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listItemsByListIDAndTitle = /* GraphQL */ `
  query ListItemsByListIDAndTitle(
    $listID: ID!
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsByListIDAndTitle(
      listID: $listID
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      __typename
    }
  }
`;
export const actionsByListItemIDAndAction = /* GraphQL */ `
  query ActionsByListItemIDAndAction(
    $listItemID: ID!
    $action: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    actionsByListItemIDAndAction(
      listItemID: $listItemID
      action: $action
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        listItemID
        action
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
