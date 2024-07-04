import Customer from "../../models/customer.js";

class CustomerRepository {
  static async findAll() {
    return await Customer.findAll();
  }

  static async findById(id) {
    return await Customer.findByPk(id);
  }

  static async create(customerData) {
    return await Customer.create(customerData);
  }

  static async update(id, customerData) {
    return await Customer.update(customerData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  static async findByEmail(email) {
    return await Customer.findOne({ where: { email: email } });
  }

  static async delete(id) {
    return await Customer.destroy({
      where: { id },
    });
  }
}

export default CustomerRepository;
