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
      homeTeamm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clubs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },{
      underscored: true,
    });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
