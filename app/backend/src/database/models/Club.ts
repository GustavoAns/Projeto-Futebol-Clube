import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';
// import OtherModel from './OtherModel';

class Club extends Model {
  public id!: number;

  public clubName!: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

Club.hasMany(Match, { foreignKey: 'id', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'id', as: 'awayMatchs' });
Match.belongsTo(Club, { foreignKey: 'homeTeamm', as: 'homeTeamm' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Club;
