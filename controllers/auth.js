const bcrypt = require('bcrypt');
const User = require('../models/user');
const authLibs = require('../libs/auth');
const authSchema = require('../schema/auth');
const validationUtils = require('../utils/validationUtils');
const utilityHelper = require('../utils/utilityHelper');
const enums = require('../utils/enums');
const userLibs = require('../libs/user')

async function register(request, response) {
  try {
    //extarct properties from request
    //just to extract data from req.body , thats why we just sedn true for body properties
    const userData = utilityHelper.getQueryParams(request, true); 

    //validate object aginst schema
    const validationReponse = validationUtils.validateObject(userData, authSchema.registrationSchema);
   
    if (!validationReponse.success) {
      return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {},  validationReponse.errors));
    }

    console.log('userData',userData);

     //check if user exist on same email then throw error
     const existingUser = await userLibs.getUserByEmail(userData.email);
    if (!utilityHelper.isNullOrEmpty(existingUser)) {
      return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.EMAIL_ALREADY_REGISTERED, {}, null));
    }
    //hashed pasowrd
    const hashedPassword = await authLibs.hashPassword(userData.password);
    const user = new User({ email: userData.email, password: hashedPassword });
    await user.save();

    return response.status(enums.STATUS_CODES.CREATED).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK,enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.USER_REGISTER_SUCCESSFULL, {user: { email: user.email, dob: user.dob }},  validationReponse.errors));
  } 
  catch (error) {
    console.error('Internal Server Error',error);
    return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNEL_SERVER_ERROR, {}, null));
  }
}

async function login(request, response) {
  console.log('login api called ..');
  try {
    //extarct properties from request
    //just to extract data from req.body , thats why we just sedn true for body properties
    const userData = utilityHelper.getQueryParams(request, true);
    const validationResponse = validationUtils.validateObject(userData, authSchema.loginSchema);

    if (!validationResponse.success) {
      console.log('validation failed error');
      return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {}, validationResponse.errors));
    }

    const user = await User.findOne({ email: userData.email });
    if (utilityHelper.isNullOrEmpty(user)) { //if user  not exist in databse
      console.log('incorrect email');
      return response.status(enums.STATUS_CODES.UNAUTHORIZED).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.AUTHENTICATION_FAILED, {}, null));
    }


    console.log('user',user)

    const passwordMatch = await authLibs.comparePassword(userData.password, user.password);
    if (!passwordMatch) {
      console.log('incorrect password');
      return response.status(enums.STATUS_CODES.UNAUTHORIZED).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.AUTHENTICATION_FAILED, {}, null));
    }

    const accessToken = await authLibs.generateAccessToken(user.id);
    const refreshToken = await authLibs.generateRefreshToken(user.id);

    return response.status(enums.STATUS_CODES.OK).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK, enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.LOGIN_SUCCESSFUL, { user: { email: user.email, dob: user.dob }, accessToken, refreshToken }, null));
  } 
  catch (error) {
    console.error('Internal Server Error',error);
    return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNEL_SERVER_ERROR, {}, null));
  }
}



async function refreshAccessToken(request, response) {
  console.log('refresh token API called...');

  try {
    // Extract properties from the request
    // Just to extract data from req.body, that's why we send true for body properties
    const data = utilityHelper.getQueryParams(request, true);
    const validationResponse = validationUtils.validateObject(data, authSchema.refreshTokenSchema);

    if (!validationResponse.success) {
      console.log('Validation failed error');
      return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {}, validationResponse.errors));
    }

    const user = await authLibs.verifyRefreshToken(data.refresh_token);

    if (utilityHelper.isNullOrEmpty(user)) {
      console.log('Invalid refresh token error');
      return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INVALID_REFRESH_TOKEN, {}, null));
    }

    const accessToken = await authLibs.generateAccessToken(user.user_id);

    return response.status(enums.STATUS_CODES.OK).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK, enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.ACCESS_TOKEN_GENERATED, { accessToken }, null));
  }
  catch (error) {
    console.error('Internal Server Error',error);
    return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNEL_SERVER_ERROR, {}, null));
  }
}



module.exports = {
  register,
  login,
  refreshAccessToken,
};
