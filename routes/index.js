import express from 'express';

import customerController from '../controllers/customerController.js';

const router = express.Router();

router.post('/search', customerController.searchCustomer)
router.post('/add', customerController.addCustomer)
router.get('/get/:id', customerController.getCustomer)
router.get('/cities', customerController.getCustomerCount) //get the customer count according to particular cities

export default router;