const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        institution: String!
        role: String!
        socialLinks: SocialLinks
        programCodes: [String]
    }
    type SocialLinks {
        instagram: String
        github: String
        linkedin: String
        website: String
    }
    type Program {
        id: ID!
        name: String!
        programCode: String!
        desc: String!
        moduleList: [ModuleList]
        createdAt: String!
    }
    type ModuleList {
        id: ID!
        name: String!
        moduleCode: String!
        desc: String!
        progress: Int!
    }
    type Module {
        id: ID!
        name: String!
        moduleCode: String!
        desc: String!
        progress: Int!
        contents: [ContentThumbnail]
        createdAt: String!
    }
    type ContentThumbnail {
        id: ID!
        number: Int!
        title: String!
        desc: String!
        completed: Boolean!
    }
    type Content {
        id: ID!
        number: Int!
        title: String!
        desc: String!
        completed: Boolean!
        notionContent: NotionContent
        ideContent: IdeContent
        createdAt: String!
    }
    type NotionContent {
        title: String!
        link: String!
    }
    type IdeContent {
        title: String!
        answer: String!
        question: String!
        testCase: [TestCase!]
        solution: String!
    }
    type TestCase {
        input: String!
        output: String!
    }
    type Query {
        getModuleList(programId: ID!): [ModuleList]
        getClassmates(programCode: String!): [User] 
        getModule(moduleId: ID!): Module
        getContent(moduleId: ID!, contentId: ID!): Content
    }
    type Mutation {
        login(email: String!, password: String!): UserAndProgram! 
        createModule(moduleInput: ModuleInput): Module!
        createUser(userInput: UserInput): User!
        createContent(ContentInput: ContentInput): Content!

    }
    type ModuleInput {
        name: String!
        moduleCode: String!
        desc: String!
    }
    type UserInput {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        institution: String!
        role: String!
        socialLinks: SocialLinks
    }
    type ContentInput {
        number: Int!
        title: String!
        desc: String!
        notionContent: NotionContent
        ideContent: IdeContent
    }
    type UserAndProgram {
        userInfo: User!
        userPrograms: [Program!]
        token: String!
    }
    `;

module.exports = typeDefs;