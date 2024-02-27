const User = require('../models/user');
const enums = require('..//utils/enums')
const utilityHelper = require('../utils/utilityHelper')
const connection =  require('../config/db')

const createDeals = async (data) => {
  try {
    let {
      deal_no, buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id } = data;

    const query = `
      INSERT INTO deals (deal_no, buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [deal_no, buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id
    ];

    const result = await connection.query(query, {
      bind: values
    });
    return result[0];
  } catch (error) {
    console.error('Error creating deal:', error);
    throw new Error('Failed to create deal');
  }
}


const getDeals = async (data) => {
  try {
    const { limit, offset } = data;

    const query = `
      SELECT deal_no, buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id
      FROM deals
      ORDER BY created_date DESC
      LIMIT $1 OFFSET $2;
    `;

    const values = [limit, offset];

    const result = await connection.query(query, { bind: values });

    return result[0];
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw new Error('Failed to fetch deals');
  }
};



const updateDeals = async (data) => {
  try {
    const {
      deal_no, buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id } = data;

    const query = `
      UPDATE deals
      SET buy_amount = $1, sell_amount = $2, booked_rate = $3, revenue = $4, margin = $5, deal_type = $6, status = $7, valid_date = $8, created_date = $9, user_id = $10
      WHERE deal_no = $11
      RETURNING *;
    `;

    const values = [buy_amount, sell_amount, booked_rate, revenue, margin, deal_type, status, valid_date, created_date, user_id, deal_no];

    const result = await connection.query(query, {
      bind: values
    });
    
    return result[0];
  } catch (error) {
    console.error('Error updating deal:', error);
    throw new Error('Failed to update deal');
  }
};





module.exports = {
  createDeals,
  getDeals,
  updateDeals
};
