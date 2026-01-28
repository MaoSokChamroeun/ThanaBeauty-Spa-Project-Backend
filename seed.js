const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectionDB = require("./config/db");
const AdminModel = require("./models/Admin.model");
const { bcryptPashash } = require("./utils/bcrypt.util");

const run = async () => {
  try {
    await connectionDB();
    const existSuper = await AdminModel.findOne({
      email: process.env.SUPER_EMAIL,
    });

    if (!existSuper) {
      console.log("Super admin not found, creating...");
      const password = process.env.SUPER_PASSWORD;
      const hashedPassword = await bcryptPashash(password);

      const data = {
        username: process.env.SUPER_USER,
        email: process.env.SUPER_EMAIL, 
        password: hashedPassword,   
        role: "admin",  
      };

      await AdminModel.create(data);
      console.log("Seeding success: Super admin created.");
    } else {
      console.log("Seeding skipped: Super admin already exists.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

run();