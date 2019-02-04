const Subscription = {
  count: {
    subscribe(parent, args, {pubsub}, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count' , {
          count
        });
      },1000);

      return pubsub.asyncIterator('count');
    }
  },

  comment: {
    subscribe(parent, args, ctx, info) {
      const {postId} = args;
      const {db , pubsub} = ctx;
      const post = db.posts.find((post) => post.id === postId && post.published);
      if(!post) {
        throw new Error(`Post ${postId} not found.`);
      }

      return pubsub.asyncIterator(`COMMENT/${postId}`);
    }
  },

  post: {
    subscribe(parent, args, ctx, info) {
      const {pubsub} = ctx;
      return pubsub.asyncIterator(`post`);
    }
  }
};

export {Subscription as default};