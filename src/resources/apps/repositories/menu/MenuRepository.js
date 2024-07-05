import Menu from "../../models/menu.js";

class MenuRepository {
  static async findAll() {
    return await Menu.findAll();
  }

  static async findByVendorId(vendorId) {
    return await Menu.findAll({
      where: { vendorId },
    });
  }

  static async findById(id) {
    return await Menu.findByPk(id);
  }

  static async create(menuData) {
    return await Menu.create(menuData);
  }

  static async update(id, menuData) {
    return await Menu.update(menuData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  static async findVendorMenu(id, vendorId) {
    return await Menu.findOne({
      where: { id, vendorId },
    });
  }

  static async delete(id) {
    return await Menu.destroy({
      where: { id },
    });
  }
}

export default MenuRepository;
