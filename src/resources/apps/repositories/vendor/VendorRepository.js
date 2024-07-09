import Vendor from "../../models/vendor.js";

class VendorRepository {
  static async findAll() {
    return await Vendor.findAll();
  }

  static async findById(id) {
    return await Vendor.findByPk(id);
  }

  static async create(vendorData) {
    return await Vendor.create(vendorData);
  }

  static async update(id, vendorData) {
    return await Vendor.update(vendorData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  static async findByEmail(email) {
    return await Vendor.findOne({ where: { email } });
  }
  static async delete(id) {
    return await Vendor.destroy({
      where: { id },
    });
  }
}

export default VendorRepository;
