const db = require('../config/db');
const enums = require('../utils/enums');
const utilityHelper = require('../utils/utilityHelper');
const validationUtils = require('../utils/validationUtils');
const dealsSchema = require('../schema/deals');
const userLibs = require('../libs/user');
const dealsLibs = require('../libs/deals');

async function createDeals(request, response) {
    try {
        const data = utilityHelper.getQueryParams(request, true, false);
        const validationResponse = validationUtils.validateObject(data, dealsSchema.createDeals);

        if (!validationResponse.success) {
            return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {}, validationResponse.errors));
        }

        const userData = await userLibs.getUserById(request.user.user_id);
        if (utilityHelper.isNullOrEmpty(userData)) {
            return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.USER_NOT_FOUND, {}, null));
        }

        data.user_id =  request.user.user_id;

        console.log('deals',data)

        const deals = await dealsLibs.createDeals(data);

        return response.status(enums.STATUS_CODES.CREATED).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK, enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.DEALS_CREATED, {
            deals
        }, validationResponse.errors));
    } catch (error) {
        console.error('Internal Server Error', error);
        return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNAL_SERVER_ERROR, {}, null));
    }
}



async function getDeals(request, response) {
    try {
        const data = utilityHelper.getQueryParams(request, false, true);
        const validationResponse = validationUtils.validateObject(data, dealsSchema.getDeals);

        if (!validationResponse.success) {
            return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {}, validationResponse.errors));
        }

        const deals = await dealsLibs.getDeals(data);

        return response.status(enums.STATUS_CODES.OK).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK, enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.DATA_FOUND, {
            deals
        }, null));
    } catch (error) {
        console.error('Internal Server Error', error);
        return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNAL_SERVER_ERROR, {}, null));
    }
}


async function updateDeals(request, response) {
    try {
        const data = utilityHelper.getQueryParams(request, true, true);
        const validationResponse = validationUtils.validateObject(data, dealsSchema.updateDeals);

        if (!validationResponse.success) {
            return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.VALIDATION_FAILED, {}, validationResponse.errors));
        }

        const userData = await userLibs.getUserById(request.user.user_id);
        if (utilityHelper.isNullOrEmpty(userData)) {
            return response.status(enums.STATUS_CODES.BAD_REQUEST).send(utilityHelper.generateResponse(enums.STATUS_CODES.BAD_REQUEST, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.USER_NOT_FOUND, {}, null));
        }

        data.user_id =  request.user.user_id;

        const deals = await dealsLibs.updateDeals(data);

        return response.status(enums.STATUS_CODES.CREATED).send(utilityHelper.generateResponse(enums.STATUS_CODES.OK, enums.API_RESPONSE_STATUS.SUCCESS, enums.API_CODES.DEALS_UPDATED, {
            deals
        }, null));
    } catch (error) {
        console.error('Internal Server Error', error);
        return response.status(enums.STATUS_CODES.INTERNAL_SERVER_ERROR).send(utilityHelper.generateResponse(enums.STATUS_CODES.INTERNAL_SERVER_ERROR, enums.API_RESPONSE_STATUS.ERROR, enums.API_CODES.INTERNAL_SERVER_ERROR, {}, null));
    }
}


module.exports = {
    createDeals,
    getDeals,
    updateDeals
};
