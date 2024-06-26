import { DataTypes } from "sequelize";
import sequelize from "../../../database/db.js";

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // enables timestamps
    createdAt: "createdAt", // sets the name of the created at timestamp attribute
    updatedAt: "updatedAt", // sets the name of the updated at timestamp attribute
  }
);

export default Customer;
