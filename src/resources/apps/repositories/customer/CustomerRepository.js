import Customer from "../../models/customer.js";

class CustomerRepository {
  findAll() {
    return Customer.findAll();
  }

  findById(id) {
    return Customer.findByPk(id);
  }

  create(customerData) {
    return Customer.create(customerData);
  }

  update(id, customerData) {
    return Customer.update(customerData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  async findByEmail(email) {
    return await Customer.findOne({ where: { email: email } });
  }

  delete(id) {
    return Customer.destroy({
      where: { id },
    });
  }
}

export default CustomerRepository;
