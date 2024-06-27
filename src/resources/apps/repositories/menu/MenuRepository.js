import Menu from "../../models/menu.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";

class MenuRepository {
  findAll() {
    return Menu.findAll();
  }

  findByVendorId(vendorId) {
    return Menu.findAll({
      where: { vendorId },
    });
  }

  findById(id) {
    return Menu.findByPk(id);
  }

  create(menuData) {
    return Menu.create(menuData);
  }

  async update(id, menuData) {
    return await Menu.update(menuData, {
      where: { id },
      returning: true,
      plain: true,
    });
  }

  async findVendorMenu(id, vendorId) {
    return await Menu.findOne({
      where: { id, vendorId },
    });
  }

  delete(id) {
    return Menu.destroy({
      where: { id },
    });
  }
}

export default MenuRepository;
