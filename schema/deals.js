const Joi = require('joi');



const createDeals = Joi.object({
    deal_no: Joi.string().required(),
    buy_amount: Joi.number().required(),
    sell_amount: Joi.number().required(),
    booked_rate: Joi.number().required(),
    revenue: Joi.number().required(),
    margin: Joi.number().required(),
    deal_type: Joi.string().required(),
    status: Joi.string().required(),
    valid_date: Joi.date().iso().required(),
    created_date: Joi.date().iso().required(),
});


const updateDeals = Joi.object({
    id: Joi.number().required(),
    deal_no: Joi.string().required(),
    buy_amount: Joi.number().required(),
    sell_amount: Joi.number().required(),
    booked_rate: Joi.number().required(),
    revenue: Joi.number().required(),
    margin: Joi.number().required(),
    deal_type: Joi.string().required(),
    status: Joi.string().required(),
    valid_date: Joi.date().iso().required(),
    created_date: Joi.date().iso().required(),
});


const getDeals = Joi.object({
    limit: Joi.number().integer().min(1).required(),
    offset: Joi.number().integer().min(0).required()
  });



module.exports = {
    createDeals,
    getDeals,
    updateDeals
};
