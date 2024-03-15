/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($filter: ModelSubscriptionListFilterInput) {
    onCreateList(filter: $filter) {
      id
      title
      description
      imageKey
      slug
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($filter: ModelSubscriptionListFilterInput) {
    onUpdateList(filter: $filter) {
      id
      title
      description
      imageKey
      slug
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($filter: ModelSubscriptionListFilterInput) {
    onDeleteList(filter: $filter) {
      id
      title
      description
      imageKey
      slug
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
export const onCreateListItem = /* GraphQL */ `
  subscription OnCreateListItem($filter: ModelSubscriptionListItemFilterInput) {
    onCreateListItem(filter: $filter) {
      id
      listID
      title
      quantity
      done
      list {
        id
        title
        description
        imageKey
        slug
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
export const onUpdateListItem = /* GraphQL */ `
  subscription OnUpdateListItem($filter: ModelSubscriptionListItemFilterInput) {
    onUpdateListItem(filter: $filter) {
      id
      listID
      title
      quantity
      done
      list {
        id
        title
        description
        imageKey
        slug
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
export const onDeleteListItem = /* GraphQL */ `
  subscription OnDeleteListItem($filter: ModelSubscriptionListItemFilterInput) {
    onDeleteListItem(filter: $filter) {
      id
      listID
      title
      quantity
      done
      list {
        id
        title
        description
        imageKey
        slug
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction($filter: ModelSubscriptionActionFilterInput) {
    onCreateAction(filter: $filter) {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction($filter: ModelSubscriptionActionFilterInput) {
    onUpdateAction(filter: $filter) {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction($filter: ModelSubscriptionActionFilterInput) {
    onDeleteAction(filter: $filter) {
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
