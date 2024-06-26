import Vendor from "../../models/vendor.js";

class VendorRepository {
  findAll() {
    return Vendor.findAll();
  }

  findById(id) {
    return Vendor.findByPk(id);
  }

  create(vendorData) {
    return Vendor.create(vendorData);
  }

  update(id, vendorData) {
    return Vendor.update(vendorData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  async findByEmail(email) {
    return await Vendor.findOne({ where: { email } });
  }
  delete(id) {
    return Vendor.destroy({
      where: { id },
    });
  }
}

export default VendorRepository;
