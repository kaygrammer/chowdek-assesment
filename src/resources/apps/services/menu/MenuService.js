import MenuRepository from "../../repositories/menu/MenuRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";

class MenuService {
  static async getAllMenus() {
    return await MenuRepository.findAll();
  }

  static async getMenusByVendorId(vendorId) {
    return await MenuRepository.findByVendorId(vendorId);
  }

  static async getMenuById(id) {
    return await MenuRepository.findById(id);
  }

  static async createMenu(menuData) {
    return await MenuRepository.create(menuData);
  }

  static async updateMenu(id, menuData) {
    return await MenuRepository.update(id, menuData);
  }

  static async updateVendorMenu(id, vendorId, menuData) {
    const menu = await MenuRepository.findVendorMenu(id, vendorId);

    if (!menu) {
      throw new CustomError("Menu item not found or you do not have permission to edit this item", 403);
    }

    await MenuRepository.update(id, menuData);
    return await this.getMenuById(id);
  }

  static async deleteMenu(id) {
    return await MenuRepository.delete(id);
  }
}

export default MenuService;
