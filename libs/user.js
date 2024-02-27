const { func } = require('joi');
const User = require('../models/user');
const enums = require('..//utils/enums')
const utilityHelper = require('../utils/utilityHelper')

async function getUserByEmail(email, columns = []) {
    try {
        const options = {
            where: { email },
            attributes: columns.length ? columns : undefined
        };
        const user = await User.findOne(options);
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Failed to fetch user by email');
    }
}

async function getUserById(userId, columns = []) {
    console.log('user',userId)
    try {
        const options = {
            where: { id: userId },
            attributes: columns.length ? columns : undefined
        };
        const user = await User.findOne(options);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user by ID');
    }
}




module.exports = {
    getUserByEmail, getUserById
}