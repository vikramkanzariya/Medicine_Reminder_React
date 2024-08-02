const { Op } = require("sequelize");
const db = require("../models/index");
const { user, session } = db;

const getUser = async (email) => {
  try {
    const userDetails = await user.findOne({ where: { email: email } });
    console.log(userDetails);
    return userDetails;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await user.findAll();

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserWithSession = async (userId) => {
  try {
    const userData = await user.findOne({
      where: { id: userId },
      include: [
        {
          model: session,
          required: true,
        },
      ],
    });

    return userData;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const userDetail = user.findByPk(userId);

    return userDetail;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const userData = await user.create(data);

    return userData;
  } catch (error) {
    throw error;
  }
};

const createSession = async (details) => {
  try {
    const sessionDetails = await session.create(details);

    return sessionDetails;
  } catch (error) {
    throw error;
  }
};

const getSession = async (token) => {
  try {
    const sessionToken = await session.findOne({
      where: { session_token: token },
    });

    return sessionToken;
  } catch (error) {
    throw error;
  }
};

const deleteSessions = async (userId, token) => {
  try {
    const isDeleted = await session.destroy({
      where: {
        user_id: userId,
        session_token: {
          [Op.ne]: token,
        },
      },
    });

    return isDeleted;
  } catch (error) {
    throw error;
  }
};

const deleteSession = async (token) => {
  try {
    const isDeleted = await session.destroy({
      where: { session_token: token },
    });

    return isDeleted;
  } catch (error) {
    throw error;
  }
};

const deleteAllSessionById = async (userId) => {
  try {
    const isDeleted = await session.destroy({ where: { user_id: userId } });

    return isDeleted;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUser,
  createSession,
  createUser,
  getUserWithSession,
  getSession,
  deleteSession,
  deleteSessions,
  deleteAllSessionById,
  getUserById,
  getUsers,
};
