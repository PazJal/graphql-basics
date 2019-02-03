const Query = {
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

  posts(parent , args , {db} , info) {
    const {query} = args;
    if(!query) {
      return db.posts;
    }
    return db.posts.filter((post) => {
      const isInTitle = post.title.toLowerCase().includes(query.toLowerCase());
      const isInBody = post.title.toLowerCase().includes(query.toLowerCase());
      return isInBody || isInTitle;
    });
  },

  users(parent , args , {db} , info) {
    const {query} = args;
    if(!query) {
      return db.users;
    } 
    return db.users.filter((user) => {
      return (user.name.toLowerCase().includes(query.toLowerCase()));
    });
  },

  comments(parent , args , {db} , info) {
    const {query} = args;
    if (!query) {
      return db.comments;
    }
    return db.comments.filter((comment) => {
      return comment.text.toLowerCase().includes(query.toLowerCase());
    })
  }
};

export {Query as default};