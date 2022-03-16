import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  static associate() {
    Match.hasMany(Club, { foreignKey: 'id' });
  }
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  home_teamm: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clubs',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clubs',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

export default Match;
