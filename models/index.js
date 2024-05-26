import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root@localhost:3306/test_ptwidyawicara", {
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

export default sequelize
