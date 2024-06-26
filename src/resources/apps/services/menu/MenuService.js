import MenuRepository from "../../repositories/menu/MenuRepository.js";

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

  deleteMenu(id) {
    return this.menuRepository.delete(id);
  }
}

export default MenuService;
