const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      return context.user || null;
    },
  },
};

export default resolvers;
