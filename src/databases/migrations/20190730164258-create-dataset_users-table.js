module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dataset_users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      cep: { type: Sequelize.STRING, allowNull: true },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dataset_users');
  },
};
