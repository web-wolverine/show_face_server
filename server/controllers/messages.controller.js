const { Message, Channel, User } = require('../database');

module.exports = {
    findById: async (id) => {
        try {
            const result = await Message.findByPk(id);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    createByChannelId: async ({
        channelId,
        userId,
        values
    }) => {
        try {
            const channel = await Channel.findByPk(channelId);

            const user = await User.findByPk(userId);

            // TODO: 
            if (!channel || !user) throw new Error('');

            const message = await Message.create(values);

            message.setChannel(channel);

            message.setCreator(user);

            return message;
        } catch (error) {
            throw new Error(error);
        }
    },

    findByChannelId: async (channelId) => {
        try {
            const result = await Message.findAndCountAll({
                where: {
                    channelId,
                },

                include: [
                    {
                        model: Channel,
                        as: 'channel',
                        attributes: ['id', 'name']
                    },
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['id', 'fullName']
                    },
                ]
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },

    create: async (values) => {
        try {
            const result = await Message.create(values);

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    updateById: async (id, values) => {
        try {
            const result = await Message.update(values, {
                where: {
                    id
                }
            });

            return result;

        } catch (error) {
            throw new Error(error);
        }
    },

    deleteById: async (id) => {
        try {
            const result = await Message.destroy({
                where: {
                    id
                }
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    },
};