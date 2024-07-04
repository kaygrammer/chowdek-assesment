import Menu from "../../models/menu.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";

class MenuRepository {
  static async findAll() {
    return Menu.findAll();
  }

  static async findByVendorId(vendorId) {
    return Menu.findAll({
      where: { vendorId },
    });
  }

  static async findById(id) {
    return Menu.findByPk(id);
  }

  static async create(menuData) {
    return Menu.create(menuData);
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
