**Implementation:**

- Fix Login & Signup Endpoints:
  Resolved exceptions thrown by the login and signup endpoints for both customer and vendor modules.

- Ensured all endpoints return responses in a uniform format consistent with the index route (/).

**Routing:**

- Menu Update Endpoint:
  Clarified the purpose of the “vendor” noun in the menu update endpoint and made necessary adjustments for consistency and clarity.

**MongoDB References:**

- Removed any unused references to MongoDB (e.g., in validations.js).
- Remove Unused Files:
  Removed files that do not have any use in the current implementation (e.g., OtpMessage.js).

**Price Representation:**

- Updated the implementation to represent prices using integers.

**Added Tests**:

Added tests to cover the implementation, ensuring better reliability and maintainability.
