const SequelizeMock = require("sequelize-mock");
const DBConnectionMock = new SequelizeMock();

const CustomerMock = DBConnectionMock.define("Customer", {
  id: "some-uuid",
  name: "Test User",
  email: "test@example.com",
  phone: "1234567890",
  password: "hashedPassword123",
});

module.exports = CustomerMock;
