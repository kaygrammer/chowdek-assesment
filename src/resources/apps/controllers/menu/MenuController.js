import MenuService from "../../services/menu/MenuService.js";
import { successResMsg, errorResMsg } from "../../../../utils/lib/response.js";
import { CustomError, NotFoundError } from "../../../../utils/lib/custom-error-handler.js";
import { menuSchema } from "../../../../utils/validation/validation.js";

const menuService = new MenuService();

class MenuController {
  async listMenus(req, res) {
    try {
      const menus = await menuService.getAllMenus();

      if (!menus || menus.length === 0) {
        throw new NotFoundError("Menus not found");
      }

      return successResMsg(res, 200, {
        message: "Menus fetched successfully",
        menus,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async listMenusByVendor(req, res) {
    const { vendorId } = req.params;
    console.log(vendorId);
    try {
      const menus = await menuService.getMenusByVendorId(vendorId);

      if (!menus || menus.length === 0) {
        throw new NotFoundError("Menus not found for the vendor");
      }

      return successResMsg(res, 200, {
        message: "Menus fetched successfully for the vendor",
        menus,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async getMenu(req, res) {
    const { id } = req.params;
    try {
      console.log(id);
      const menu = await menuService.getMenuById(id);
      if (!menu) {
        throw new NotFoundError("Menu item not found");
      }
      return successResMsg(res, 200, {
        message: "Menu item fetched successfully",
        menu,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async createMenu(req, res) {
    const vendorId = req.user.id;
    const { error } = menuSchema.validate(req.body);
    if (error) {
      return errorResMsg(res, 400, error.message);
    }
    const menuData = { ...req.body, vendorId };
    try {
      const newMenu = await menuService.createMenu(menuData);
      return successResMsg(res, 201, {
        message: "Menu created successfully",
        newMenu,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, err.message);
      }
    }
  }

  async updateMenu(req, res) {
    const { id } = req.params;
    const { error } = menuSchema.validate(req.body);
    if (error) {
      return errorResMsg(res, 400, error.message);
    }
    const menuData = req.body;
    try {
      const updatedMenu = await menuService.updateMenu(id, menuData);
      return successResMsg(res, 200, {
        message: "Menu updated successfully",
        updatedMenu,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async updateVendorMenu(req, res) {
    const vendorId = req.user.id;
    const { id } = req.params;
    const { error } = menuSchema.validate(req.body);
    if (error) {
      return errorResMsg(res, 400, error.message);
    }
    const menuData = req.body;
    try {
      const updatedMenu = await menuService.updateVendorMenu(id, vendorId, menuData);
      return successResMsg(res, 200, {
        message: "Menu updated successfully",
        updatedMenu,
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }

  async deleteMenu(req, res) {
    const { id } = req.params;
    try {
      await menuService.deleteMenu(id);
      return successResMsg(res, 200, {
        message: "Menu deleted successfully",
      });
    } catch (err) {
      if (err instanceof CustomError) {
        errorResMsg(res, err.statusCode, err.message);
      } else {
        errorResMsg(res, 500, "Oops, something went wrong...");
      }
    }
  }
}

export default new MenuController();
