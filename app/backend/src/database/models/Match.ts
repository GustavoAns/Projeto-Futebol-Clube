import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id!: number;

  public homeTeamm!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: number;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamm: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clubs',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clubs',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
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
