import {GraphQLServer} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';


//Demo user data:
const users = [
  {
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
  }
];


//Demo post data:
const posts = [
  {
    id: '10',
    title: 'First post',
    body: 'This is the first post.',
    published: false,
    author: '1'
  },
  {
    id: '20',
    title: 'Second post',
    body: 'This is the second post.',
    published: true,
    author: '1'
  },
  {
    id: '30',
    title: 'Third post',
    body: 'This is the third post.',
    published: false,
    author: '2'
  }
];

//Demo comment data:
const comments = [
  {
    id: '100',
    text: 'The test text 1',
    author: '1',
    post: '30'
  },
  {
    id: '200',
    text: 'Some test text 2',
    author: '1',
    post: '30'
  },
  {
    id: '300',
    text: 'Another test text 3',
    author: '1',
    post: '30'
  },
  {
    id: '400',
    text: 'Final test text 4',
    author: '2',
    post: '20'
  }
];

//Types: 
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String):[Post!]!
    comments(query: String): [Comment!]!
  }

  type Mutation {
    createUser(name: String! , email: String! , age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    age: Int
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

//Resolvers:
const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'Mike@example.com'
      }
    },

    post() {
      return {
        id: '1234',
        title: 'My Post',
        body: 'Im talking about my post, my post',
        published: 1998
      }
    },

    posts(parent , args , ctx , info) {
      const {query} = args;
      if(!query) {
        return posts;
      }
      return posts.filter((post) => {
        const isInTitle = post.title.toLowerCase().includes(query.toLowerCase());
        const isInBody = post.title.toLowerCase().includes(query.toLowerCase());
        return isInBody || isInTitle;
      });
    },

    users(parent , args , ctx , info) {
      const {query} = args;
      if(!query) {
        return users;
      } 
      return users.filter((user) => {
        return (user.name.toLowerCase().includes(query.toLowerCase()));
      });
    },

    comments(parent , args , ctx , info) {
      const {query} = args;
      if (!query) {
        return comments;
      }
      return comments.filter((comment) => {
        return comment.text.toLowerCase().includes(query.toLowerCase());
      })
    }
  },

  Mutation: {
    createUser(parent , args , ctx , info) {
      const {email , name, age} = args;
      const emailTaken = users.some((user) => {
        return user.email === email;
      });

      if(emailTaken) {
        throw new Error(`Email ${email} is already in use.`);
      }

      const user = {
        id: uuidv4(),
        name,
        email,
        age
      }

      users.push(user);

      return user;
    }
  },

  Post: {
    author(parent , args , ctx , info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    comments(parent , args , ctx , info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    }
  },

  User: {
    posts(parent , args ,ctx , info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent , args , ctx , info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    }
  },

  Comment: {
    author(parent , args , ctx , info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },

    post(parent , args ,ctx , info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    }
  }
}

const server  = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log(`The server is up`);
});