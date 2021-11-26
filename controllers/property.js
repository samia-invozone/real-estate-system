const { Property, PropertyFeature, User, Feature } = require("../models");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const valid = require("../validations/validation");

// get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [
        {
          model: Feature,
        },
      ],
    });
    return successResponse(req, res, "List of properties", properties);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};

// add new property
const addNewProperty = async (req, res) => {
  try {
    const { error } = valid.addPropertySchema(req.body);
    if (error) return errorResponse(req, res, error.details[0].message, 400);
    const {
      title,
      description,
      type,
      status,
      location,
      garage,
      area,
      size,
      price,
    } = req.body;
    const { noOfBedroom } = req.body.no_of_bedroom;
    const { noOfBathroom } = req.body.no_of_bathroom;
    const { noOfFloor } = req.body.no_of_floor;
    const authUser = await User.findOne({ where: { email: req.user.email } });
    const payload = {
      title,
      description,
      type,
      status,
      location,
      no_of_bedroom: noOfBedroom,
      no_of_bathroom: noOfBathroom,
      no_of_floor: noOfFloor,
      garage,
      area,
      size,
      price,
      user_id: authUser.id,
    };
    const property = await Property.create(payload);
    // below code is to save property features because one property has many features
    req.body.feature_id.forEach((id) => {
      const addFeature = {
        property_id: property.id,
        feature_id: id,
      };
      const propertyFeature = PropertyFeature.create(addFeature);
    });

    return successResponse(req, res, "Property added successfully", property);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};

// delete property by id
const deletePropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkProperty = await Property.findOne({
      where: { id },
    });
    if (checkProperty) {
      const deleteFromFeatures = await PropertyFeature.destroy({
        where: { property_id: id },
      });
      const deleteProperty = await Property.destroy({
        where: { id },
      });
      if (deleteProperty) {
        return successResponse(
          req,
          res,
          "Property has been deleted",
          deleteProperty
        );
      }
    }
    return errorResponse(req, res, "No, property found to delete", 400);
  } catch (err) {
    return errorResponse(req, res, err.message, 400);
  }
};
module.exports = {
  getAllProperties,
  addNewProperty,
  deletePropertyById,
};
