'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      home_teamm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
