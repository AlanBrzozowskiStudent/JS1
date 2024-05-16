module.exports = (sequelize, Sequelize) => {
  const Ad = sequelize.define("ads", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    images: {
      type: Sequelize.JSON, // JSON array to store base64-encoded images
      allowNull: true,
      defaultValue: []
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    creator: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  return Ad;
};