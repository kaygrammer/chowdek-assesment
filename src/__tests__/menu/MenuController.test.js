import MenuController from "../../resources/apps/controllers/menu/MenuController";
import MenuService from "../../resources/apps/services/menu/MenuService";
import { successResMsg, errorResMsg } from "../../utils/lib/response";
import { menuSchema } from "../../utils/validation/validation";

jest.mock("../../resources/apps/services/menu/MenuService");
jest.mock("../../utils/lib/response");
jest.mock("../../utils/validation/validation");

describe("MenuController", () => {
  describe("listMenus", () => {
    it("should fetch all menus", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const menus = [{ id: 1, name: "Menu 1" }];
      MenuService.getAllMenus.mockResolvedValue(menus);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.listMenus(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.getAllMenus).toHaveBeenCalled();
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menus fetched successfully",
        menus,
      });
    });

    it("should return 404 if no menus found", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      MenuService.getAllMenus.mockResolvedValue([]);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.listMenus(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(MenuService.getAllMenus).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Menus not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.getAllMenus.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.listMenus(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.getAllMenus).toHaveBeenCalled();
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("listMenusByVendor", () => {
    it("should fetch menus by vendor ID", async () => {
      const req = { params: { vendorId: "123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const menus = [{ id: 1, name: "Menu 1", vendorId: "123" }];
      MenuService.getMenusByVendorId.mockResolvedValue(menus);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.listMenusByVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.getMenusByVendorId).toHaveBeenCalledWith("123");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menus fetched successfully for the vendor",
        menus,
      });
    });

    it("should return 404 if no menus found for the vendor", async () => {
      const req = { params: { vendorId: "123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      MenuService.getMenusByVendorId.mockResolvedValue([]);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.listMenusByVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(MenuService.getMenusByVendorId).toHaveBeenCalledWith("123");
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Menus not found for the vendor");
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { vendorId: "123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.getMenusByVendorId.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.listMenusByVendor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.getMenusByVendorId).toHaveBeenCalledWith("123");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("getMenu", () => {
    it("should fetch a menu by ID", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const menu = { id: 1, name: "Menu 1" };
      MenuService.getMenuById.mockResolvedValue(menu);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.getMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.getMenuById).toHaveBeenCalledWith("1");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menu item fetched successfully",
        menu,
      });
    });

    it("should return 404 if menu not found", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      MenuService.getMenuById.mockResolvedValue(null);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.getMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(MenuService.getMenuById).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 404, "Menu item not found");
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.getMenuById.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.getMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.getMenuById).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("createMenu", () => {
    it("should create a new menu", async () => {
      const req = { body: { name: "New Menu" }, user: { id: "vendor1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const newMenu = { id: 1, name: "New Menu", vendorId: "vendor1" };
      MenuService.createMenu.mockResolvedValue(newMenu);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      menuSchema.validate.mockReturnValue({ error: null });

      await MenuController.createMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(MenuService.createMenu).toHaveBeenCalledWith({ ...req.body, vendorId: "vendor1" });
      expect(successResMsg).toHaveBeenCalledWith(res, 201, {
        message: "Menu created successfully",
        newMenu,
      });
    });

    it("should return 400 if validation fails", async () => {
      const req = { body: { name: "" }, user: { id: "vendor1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const validationError = { message: "Validation error" };
      menuSchema.validate.mockReturnValue({ error: validationError });
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.createMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(errorResMsg).toHaveBeenCalledWith(res, 400, validationError.message);
    });

    it("should return 500 if an error occurs", async () => {
      const req = { body: { name: "New Menu" }, user: { id: "vendor1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.createMenu.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      menuSchema.validate.mockReturnValue({ error: null });

      await MenuController.createMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.createMenu).toHaveBeenCalledWith({ ...req.body, vendorId: "vendor1" });
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("updateMenu", () => {
    it("should update a menu", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Menu" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedMenu = { id: 1, name: "Updated Menu" };
      MenuService.updateMenu.mockResolvedValue(updatedMenu);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.updateMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.updateMenu).toHaveBeenCalledWith("1", req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menu updated successfully",
        updatedMenu,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Menu" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.updateMenu.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.updateMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.updateMenu).toHaveBeenCalledWith("1", req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("updateVendorMenu", () => {
    it("should update a vendor's menu", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Vendor Menu" }, user: { id: "vendor1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedMenu = { id: 1, name: "Updated Vendor Menu" };
      MenuService.updateVendorMenu.mockResolvedValue(updatedMenu);
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.updateVendorMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.updateVendorMenu).toHaveBeenCalledWith("1", "vendor1", req.body);
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menu updated successfully",
        updatedMenu,
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" }, body: { name: "Updated Vendor Menu" }, user: { id: "vendor1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.updateVendorMenu.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.updateVendorMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.updateVendorMenu).toHaveBeenCalledWith("1", "vendor1", req.body);
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });

  describe("deleteMenu", () => {
    it("should delete a menu", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      MenuService.deleteMenu.mockResolvedValue();
      successResMsg.mockImplementation((res, statusCode, data) => {
        res.status(statusCode).json(data);
      });

      await MenuController.deleteMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(MenuService.deleteMenu).toHaveBeenCalledWith("1");
      expect(successResMsg).toHaveBeenCalledWith(res, 200, {
        message: "Menu deleted successfully",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error("Internal Server Error");
      MenuService.deleteMenu.mockRejectedValue(error);
      errorResMsg.mockImplementation((res, statusCode, message) => {
        res.status(statusCode).json({ message });
      });

      await MenuController.deleteMenu(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(MenuService.deleteMenu).toHaveBeenCalledWith("1");
      expect(errorResMsg).toHaveBeenCalledWith(res, 500, "Oops, something went wrong...");
    });
  });
});
