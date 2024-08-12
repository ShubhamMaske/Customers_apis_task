import Joi from 'joi'
import pkg from 'lodash'
const { isUndefined, isEmpty } = pkg
import { Customer } from '../models/index.js'

const customerController = {
  async searchCustomer (req, res, next) {
    // validate the request body
    const customerSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      city: Joi.string().required()
    })

    const { error } = customerSchema.validate(req.body)

    if (error) {
        res.status(401).json({ message: 'first_name, last_name and city must be valid' })
    }

    try {
        const { first_name, last_name, city, page = 1, limit = 10 } = req.body
        const query = {};
        query.first_name = first_name;
        query.last_name = last_name;
        query.city = city;

        const customers = await Customer.find(query).skip((page - 1) * limit).limit(Number(limit));

        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  async getCustomer (req, res, next) {
    const { id } = req.params
    try {
        //validating the inputs
        if( isUndefined(id) || isEmpty(id)) {
            res.status(401).json({ message: 'customer id is required' })
        }

      const customer = await Customer.findOne({ id: Number(id) })

      if (customer) {
        res.status(201).json(customer)
      } else {
        res.status(404).json({ error: 'Customer not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async addCustomer (req, res, next) {
    const { id, first_name, last_name, city, company } = req.body
    // validate the request body
    const customerSchema = Joi.object({
      id: Joi.number().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      city: Joi.string().required(),
      company: Joi.string().required()
    })

    const { error } = customerSchema.validate(req.body)

    if (error) {
      res.status(401).json({ message: 'Invalid Inputs' })
    }

    try {
      // Check if city and company already exist
      const existingCustomer = await Customer.findOne({ city, company })
      if (!existingCustomer) {
        return res
          .status(400)
          .json({ error: 'City and company must already exist' })
      }

      const newCustomer = await Customer.create({
        id,
        first_name,
        last_name,
        city,
        company
      })
      res.status(201).json(newCustomer)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  //    
  async getCustomerCount (req, res, next) {
    try {
        const cities = await Customer.aggregate([
          { $group: { _id: "$city", count: { $sum: 1 } } }
        ]);
        res.json(cities);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
}

export default customerController
