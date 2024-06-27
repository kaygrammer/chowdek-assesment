import MenuRepository from "../../repositories/menu/MenuRepository.js";
import { CustomError } from "../../../../utils/lib/custom-error-handler.js";

class MenuService {
  constructor() {
    this.menuRepository = new MenuRepository();
  }

  getAllMenus() {
    return this.menuRepository.findAll();
  }

  getMenusByVendorId(vendorId) {
    return this.menuRepository.findByVendorId(vendorId);
  }

  getMenuById(id) {
    return this.menuRepository.findById(id);
  }

  createMenu(menuData) {
    return this.menuRepository.create(menuData);
  }

  updateMenu(id, menuData) {
    return this.menuRepository.update(id, menuData);
  }

  async updateVendorMenu(id, vendorId, menuData) {
    const menu = await this.menuRepository.findVendorMenu(id, vendorId);

    if (!menu) {
      throw new CustomError("Menu item not found or you do not have permission to edit this item", 403);
    }

    await this.menuRepository.update(id, menuData);
    return await this.getMenuById(id);
  }

  deleteMenu(id) {
    return this.menuRepository.delete(id);
  }
}

export default MenuService;
