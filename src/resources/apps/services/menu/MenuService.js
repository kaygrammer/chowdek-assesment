import MenuRepository from "../../repositories/menu/MenuRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";

class MenuService {
  static async getAllMenus() {
    try {
      return await MenuRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getMenusByVendorId(vendorId) {
    try {
      return await MenuRepository.findByVendorId(vendorId);
    } catch (error) {
      throw error;
    }
  }

  static async getMenuById(id) {
    try {
      return await MenuRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async createMenu(menuData) {
    try {
      return await MenuRepository.create(menuData);
    } catch (error) {
      throw error;
    }
  }

  static async updateMenu(id, menuData) {
    try {
      return await MenuRepository.update(id, menuData);
    } catch (error) {
      throw error;
    }
  }

  static async updateVendorMenu(id, vendorId, menuData) {
    try {
      const menu = await MenuRepository.findVendorMenu(id, vendorId);

      if (!menu) {
        throw new CustomError("Menu item not found or you do not have permission to edit this item", 403);
      }

      await MenuRepository.update(id, menuData);
      return await this.getMenuById(id);
    } catch (error) {
      throw error;
    }
  }

  static async deleteMenu(id) {
    try {
      return await MenuRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default MenuService;
