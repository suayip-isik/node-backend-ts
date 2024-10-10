import { Sequelize } from "sequelize";
import User from "./userModel";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string, 10),
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to test`);
  })
  .catch((err) => {
    console.log(err);
  });

interface DB {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  Users: ReturnType<typeof User>;
}

const db: Partial<DB> = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = User(sequelize);

export default db as DB;
