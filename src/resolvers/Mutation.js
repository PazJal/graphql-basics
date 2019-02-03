import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent , args , {db} , info) {
    const {email} = args.data;
    const emailTaken = db.users.some((user) => {
      return user.email === email;
    });

    if(emailTaken) {
      throw new Error(`Email ${email} is already in use.`);
    }

    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(user);

    return user;
  },

  deleteUser(parent, args, {db}, info) {
    const {id} = args;
    console.log(args);
    const userIndex = db.users.findIndex((user) => {
      return user.id === id;
    });

    if(userIndex === -1) {
      throw new Error(`User ${id} not found.`);
    }

    const deletedUsers = db.users.splice(userIndex , 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === id;
      if(match){
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== id);

    return deletedUsers[0];
  },

  updateUser(parent, args, {db}, info) {
    const {id, data} = args;
    const user = db.users.find((user) => user.id === id);
    if(!user){
      throw new Error(`User ${id} not found`);
    }
    if (typeof data.email === 'string'){
      const emailTaken = db.users.some((user) => user.email === data.email);

      if(emailTaken){
        throw new Error(`Email ${data.email} already in use.`);
      }
      user.email = data.email;
    }

    if(typeof data.name === 'string'){
      user.name = data.name;
    }

    if(typeof data.age !== 'undefined'){
      user.age = data.age;
    }

    return user;
  },

  createPost(parent ,args, {db}, info) {
    const {author} = args.data;
    const userExists = db.users.some((user) => user.id === author);
    if(!userExists) {
      throw new Error(`User ${author} not found.`);
    }

    const post = {
      ...args.data,
      id: uuidv4()
    };

    db.posts.push(post);
    return post;
  },

  deletePost(parent, args, {db}, info) {
    const {id} = args;
    const postIndex = db.posts.findIndex((post) => post.id === id);
    if(postIndex === -1){
      throw new Error(`Post ${id} not found.`);
    }

    const deletedPosts = db.posts.splice(postIndex , 1);

    db.comments = db.comments.filter((comment) => comment.post !== id);

    return deletedPosts[0];
  },

  createComment(parent, args, {db}, info){
    const {author, post} = args.data;
    const userExists = db.users.some((user) => user.id === author);
    const postPublished = db.posts.some((currentPost) => (currentPost.id === post && currentPost.published));

    if(!userExists) {
      throw new Error(`User ${author} does not exist.`);
    }
    if(!postPublished){
      throw new Error(`No published post matches: ${post}`);
    }

    const comment = {
      ...args.data,
      id: uuidv4()
    };

    db.comments.push(comment);

    return comment;

  },

  deleteComment(parent ,args, {db}, info) {
    const {id} = args;
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if(commentIndex === -1){
      throw new Error(`Comment ${id} was not found.`);
    }

    const deletedComments = db.comments.splice(commentIndex , 1);

    return deletedComments[0];
  }
}

export {Mutation as default};