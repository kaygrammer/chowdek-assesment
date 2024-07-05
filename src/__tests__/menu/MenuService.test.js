import MenuService from "../../resources/apps/services/menu/MenuService.js";
import MenuRepository from "../../resources/apps/repositories/menu/MenuRepository.js";
import { CustomError } from "../../utils/lib/custom-error-handler.js";

jest.mock("../../resources/apps/repositories/menu/MenuRepository.js");

describe("MenuService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createMenu", () => {
    it("should create a new menu", async () => {
      const menuData = { name: "Test Menu", price: 1000, vendorId: "vendor1" };
      const newMenu = {
        id: "123e4567-e89b-12d3-a456-426614174001",
        vendorId: "vendor1",
        name: "Test Menu",
        description: "A sample description",
        price: 1000,
      };

      MenuRepository.create.mockResolvedValue(newMenu);

      const result = await MenuService.createMenu(menuData);

      expect(MenuRepository.create).toHaveBeenCalledWith(menuData);
      expect(result).toEqual(newMenu);
    });

    it("should handle errors during menu creation", async () => {
      const menuData = { name: "Test Menu", price: 1000, vendorId: "vendor1" };
      const errorMessage = "Database error";

      MenuRepository.create.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.createMenu(menuData)).rejects.toThrow(Error);
      expect(MenuRepository.create).toHaveBeenCalledWith(menuData);
    });
  });

  describe("getAllMenus", () => {
    it("should fetch all menus", async () => {
      const menus = [
        { id: "1", name: "Menu 1", vendorId: "vendor1", price: 1000 },
        { id: "2", name: "Menu 2", vendorId: "vendor2", price: 2000 },
      ];

      MenuRepository.findAll.mockResolvedValue(menus);

      const result = await MenuService.getAllMenus();

      expect(MenuRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(menus);
    });

    it("should handle errors during fetching all menus", async () => {
      const errorMessage = "Database error";

      MenuRepository.findAll.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.getAllMenus()).rejects.toThrow(Error);
      expect(MenuRepository.findAll).toHaveBeenCalled();
    });
  });

  describe("getMenusByVendorId", () => {
    it("should fetch menus by vendor ID", async () => {
      const vendorId = "vendor1";
      const menus = [
        { id: "1", name: "Menu 1", vendorId: "vendor1", price: 1000 },
        { id: "2", name: "Menu 2", vendorId: "vendor1", price: 2000 },
      ];

      MenuRepository.findByVendorId.mockResolvedValue(menus);

      const result = await MenuService.getMenusByVendorId(vendorId);

      expect(MenuRepository.findByVendorId).toHaveBeenCalledWith(vendorId);
      expect(result).toEqual(menus);
    });

    it("should handle errors during fetching menus by vendor ID", async () => {
      const vendorId = "vendor1";
      const errorMessage = "Database error";

      MenuRepository.findByVendorId.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.getMenusByVendorId(vendorId)).rejects.toThrow(Error);
      expect(MenuRepository.findByVendorId).toHaveBeenCalledWith(vendorId);
    });
  });

  describe("getMenuById", () => {
    it("should fetch menu by ID", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const menu = { id, name: "Test Menu", vendorId: "vendor1", price: 1000 };

      MenuRepository.findById.mockResolvedValue(menu);

      const result = await MenuService.getMenuById(id);

      expect(MenuRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(menu);
    });

    it("should handle errors during fetching menu by ID", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const errorMessage = "Database error";

      MenuRepository.findById.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.getMenuById(id)).rejects.toThrow(Error);
      expect(MenuRepository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("updateMenu", () => {
    it("should update a menu", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const menuData = { name: "Updated Menu", price: 1200 };
      const updatedMenu = { id, vendorId: "vendor1", ...menuData };

      MenuRepository.update.mockResolvedValue([1, [updatedMenu]]);

      const result = await MenuService.updateMenu(id, menuData);

      expect(MenuRepository.update).toHaveBeenCalledWith(id, menuData);
      expect(result).toEqual([1, [updatedMenu]]);
    });

    it("should handle errors during menu update", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const menuData = { name: "Updated Menu", price: 1200 };
      const errorMessage = "Database error";

      MenuRepository.update.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.updateMenu(id, menuData)).rejects.toThrow(Error);
      expect(MenuRepository.update).toHaveBeenCalledWith(id, menuData);
    });
  });

  describe("updateVendorMenu", () => {
    it("should update a vendor's menu", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const vendorId = "vendor1";
      const menuData = { name: "Updated Menu", price: 1200 };
      const menu = { id, vendorId, name: "Original Menu", price: 1000 };
      const updatedMenu = { id, vendorId, ...menuData };

      MenuRepository.findVendorMenu.mockResolvedValue(menu);
      MenuRepository.update.mockResolvedValue([1, [updatedMenu]]);
      MenuRepository.findById.mockResolvedValue(updatedMenu);

      const result = await MenuService.updateVendorMenu(id, vendorId, menuData);

      expect(MenuRepository.findVendorMenu).toHaveBeenCalledWith(id, vendorId);
      expect(MenuRepository.update).toHaveBeenCalledWith(id, menuData);
      expect(MenuRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(updatedMenu);
    });

    it("should throw an error if menu is not found or permission is denied", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const vendorId = "vendor1";
      const menuData = { name: "Updated Menu", price: 1200 };

      MenuRepository.findVendorMenu.mockResolvedValue(null);

      await expect(MenuService.updateVendorMenu(id, vendorId, menuData)).rejects.toThrow(CustomError);
      expect(MenuRepository.findVendorMenu).toHaveBeenCalledWith(id, vendorId);
    });

    it("should handle errors during vendor menu update", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const vendorId = "vendor1";
      const menuData = { name: "Updated Menu", price: 1200 };
      const menu = { id, vendorId, name: "Original Menu", price: 1000 };
      const errorMessage = "Database error";

      MenuRepository.findVendorMenu.mockResolvedValue(menu);
      MenuRepository.update.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.updateVendorMenu(id, vendorId, menuData)).rejects.toThrow(Error);
      expect(MenuRepository.findVendorMenu).toHaveBeenCalledWith(id, vendorId);
      expect(MenuRepository.update).toHaveBeenCalledWith(id, menuData);
    });
  });

  describe("deleteMenu", () => {
    it("should delete a menu", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";

      MenuRepository.delete.mockResolvedValue(1);

      const result = await MenuService.deleteMenu(id);

      expect(MenuRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(1);
    });

    it("should handle errors during menu deletion", async () => {
      const id = "123e4567-e89b-12d3-a456-426614174001";
      const errorMessage = "Database error";

      MenuRepository.delete.mockRejectedValue(new Error(errorMessage));

      await expect(MenuService.deleteMenu(id)).rejects.toThrow(Error);
      expect(MenuRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
