import SavedPlant from '../models/SavedPlant.js';

const resolvers = {
  Query: {
    getSavedPlantsByUser: async (_parent: any, { userId }: { userId: string }) => {
      return SavedPlant.find({ userId });
    },
    getSavedPlantById: async (_parent: any, { id }: { id: string }) => {
      return SavedPlant.findById(id);
    },
  },

  Mutation: {
    addSavedPlant: async (_parent: any, { trefleId, nickname, location, imageUrl }: any, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      return SavedPlant.create({
        userId: context.user._id,
        trefleId,
        nickname,
        location,
        imageUrl,
      });
    },

    removeSavedPlant: async (_parent: any, { id }: { id: string }, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      const plant = await SavedPlant.findById(id);
      if (!plant || String(plant.userId) !== String(context.user._id)) {
        throw new Error('Unauthorized');
      }
      await plant.deleteOne();
      return plant;
    },

    updateSavedPlant: async (_parent: any, { id, nickname, location }: any, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      const plant = await SavedPlant.findById(id);
      if (!plant || String(plant.userId) !== String(context.user._id)) {
        throw new Error('Unauthorized');
      }
      if (nickname !== undefined) plant.nickname = nickname;
      if (location !== undefined) plant.location = location;
      await plant.save();
      return plant;
    },
  },
};

export default resolvers;