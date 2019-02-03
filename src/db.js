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
    post: '10'
  },
  {
    id: '200',
    text: 'Some test text 2',
    author: '3',
    post: '20'
  },
  {
    id: '300',
    text: 'Another test text 3',
    author: '2',
    post: '30'
  },
  {
    id: '400',
    text: 'Final test text 4',
    author: '1',
    post: '30'
  }
];

const db = {
  users,
  posts,
  comments
}

export {db as default};