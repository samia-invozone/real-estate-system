const { Op } = require("sequelize");
const valid = require("../../validations/validation");
const { User, Role, UserRole } = require("../../models");
const {
  successResponse,
  errorResponse,
} = require("../../helpers/responseHelper");
// get all users
const getAllUser = async (req, res) => {
  try {
    // fetch only those users whose role is not admin
    const users = await User.findAll({
      include: [
        {
          model: Role,
          where: {
            id: { [Op.ne]: 1 },
          },
        },
      ],
    });
    return successResponse(req, res, "List of users", users);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      return successResponse(req, res, "User details", user);
    }
    return errorResponse(req, res, "No, user found", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};

// update user by id
const updateUserById = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return errorResponse(req, res, "req body cannot be empty", 400);
    }
    const { id } = req.params;
    // return res.send(id);
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    // return res.send(updated);
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return successResponse(req, res, "User has been updated", updatedUser);
    }
    return errorResponse(req, res, "No, user found to update", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};

// delete user by id
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await User.findOne({
      where: { id },
    });
    if (checkUser) {
      const deleteFromRole = await UserRole.destroy({
        where: { user_id: id },
      });
      const deleteUser = await User.destroy({
        where: { id },
      });
      if (deleteUser) {
        return successResponse(req, res, "User has been deleted", deleteUser);
      }
    }
    return errorResponse(req, res, "No, user found to delete", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
