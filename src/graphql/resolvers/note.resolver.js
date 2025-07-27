import noteModel from '../../DB/models/Notes.model.js';

export const resolvers = {
  Query: {
    notes: async (_, { filter }) => {
      const {
        userId,
        title,
        from,
        to,
        page = 1,
        limit = 10,
      } = filter || {};

      const query = {};

      if (userId) {
        query.owner = userId;
      }

      if (title) {
        query.title = { $regex: title, $options: 'i' };
      }

      if (from || to) {
        query.createdAt = {};
        if (from) query.createdAt.$gte = new Date(from);
        if (to) query.createdAt.$lte = new Date(to);
      }

      const totalNotes = await noteModel.countDocuments(query);
      const totalPages = Math.ceil(totalNotes / limit);
      const skip = (page - 1) * limit;

      const notes = await noteModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('owner');

      return {
        notes,
        totalPages,
        currentPage: page,
      };
    },
  },
};
