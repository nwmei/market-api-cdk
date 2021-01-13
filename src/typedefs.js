import { gql } from  "apollo-server-express";

export const typeDefs = gql`

    input UserInput {
        id: ID!,
        firstName: String!,
        lastName: String!,
        emailAddress: String!,
        imageUrl: String!
    }

    input CreateUserInput {
        firstName: String!,
        lastName: String!,
        emailAddress: String!,
        imageUrl: String,
    }

    input CreateStoreItemInput {
        name: String!,
        description: String!,
        seller: UserInput!,
        price: Int!,
        imageUrl: String!,
        category: String!,
        neighborhood: String!
    }

    input UserExistsInput {
        emailAddress: String!
    }

    input AccessTokenInput {
        accessToken: String!,
        userId: String!,
        imageUrl: String
    }

    input ClearAccessTokenInput {
        accessToken: String!
    }

    input SessionUserDetailsInput {
        accessToken: String!
    }

    input LikeItemInput {
        likerId: ID!, 
        storeItemId: ID!
    }

    input StoreItemInput {
        id: ID!,
        postedTimes: Int
    }
    
    input CreateCommentInput {
        commenterId: ID!,
        storeItemId: ID!,
        commenterFullName: String!,
        commentText: String!,
        commenterImageUrl: String!
    }

    input UserIdInput {
        id: ID!
    }

    input Filter {
        filterClass: String!,
        filterType: String!,
        label: String!
        value: [String]!
    }

    input StoreItemsInput {
        page: Int!,
        filters: [Filter]!,
    }

    input MyItemsInput {
        id: ID!,
        likedPage: Int!,
        listedPage: Int!,
        filters: [Filter]!,
    }

    type Query {
        testQuery: String!,
        storeItems(input: StoreItemsInput): [StoreItem],
        storeItem(input: StoreItemInput!): StoreItem!,
        user(id: ID!): User!,
        userExists(input: UserExistsInput!): UserExists!,
        sessionUserDetails(input: SessionUserDetailsInput!): User,
        myItems(input: MyItemsInput!): MyItems!
    }

    type Mutation {
        createStoreItem(input: CreateStoreItemInput!): StoreItem!,
        createUser(input: CreateUserInput!): User!,
        createComment(input: CreateCommentInput!): Comment!,
        likeItem(input: LikeItemInput!): Status!
        unlikeItem(input: LikeItemInput!): Status!
        setAccessToken(input: AccessTokenInput!): Status!,
        clearAccessToken(input: ClearAccessTokenInput!): Status!,
    }

    type MyItems {
        likedByMe: [StoreItem],
        listedByMe: [StoreItem]
    }

    type StoreItem {
        id: ID!,
        name: String!,
        description: String!,
        price: Int!,
        imageUrl: String!,
        seller: User!
        comments: [Comment],
        likes: [ID],
        date: String,
        category: String!,
        neighborhood: String!
    }

    type Status {
        success: Boolean!
    }

    type User {
        id: ID!,
        accessToken: String!,
        firstName: String!,
        lastName: String!,
        emailAddress: String!,
        imageUrl: String!,
        likedItems: [String],
        listedItems: [String]
    }

    type UserExists {
        exists: Boolean!,
        id: ID
    }

    type Comment {
        commenterFullName: String!,
        commenterId: ID!,
        commentText: String!,
        commenterImageUrl: String
    }

    

  `;