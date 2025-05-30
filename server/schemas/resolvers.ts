import SavedPlant from '../models/SavedPlant.js';
import JournalEntry from '../models/JournalEntry.js';

const resolvers = {
  Query: {
    getSavedPlantsByUser: async (_parent: any, { userId }: { userId: string }) => {
      return SavedPlant.find({ userId });
    },
    getSavedPlantById: async (_parent: any, { id }: { id: string }) => {
      return SavedPlant.findById(id);
    },
    getJournalEntriesByPlant: async (_parent: any, { savedPlantId }: { savedPlantId: string }) => {
      return JournalEntry.find({ savedPlantId });
    },
    getJournalEntryById: async (_parent: any, { id }: { id: string }) => {
      return JournalEntry.findById(id);
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

    addJournalEntry: async (_parent: any, { savedPlantId, date, status, notes, image }: any, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      return JournalEntry.create({
        savedPlantId,
        userId: context.user._id,
        date,
        status,
        notes,
        image,
      });
    },
    updateJournalEntry: async (_parent: any, { id, status, notes, image }: any, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      const entry = await JournalEntry.findById(id);
      if (!entry || String(entry.userId) !== String(context.user._id)) {
        throw new Error('Unauthorized');
      }
      if (status !== undefined) entry.status = status;
      if (notes !== undefined) entry.notes = notes;
      if (image !== undefined) entry.image = image;
      await entry.save();
      return entry;
    },
    deleteJournalEntry: async (_parent: any, { id }: { id: string }, context: any) => {
      if (!context.user) throw new Error('Authentication required');
      const entry = await JournalEntry.findById(id);
      if (!entry || String(entry.userId) !== String(context.user._id)) {
        throw new Error('Unauthorized');
      }
      await entry.deleteOne();
      return entry;
    },
  },
};

export default resolvers;