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
    field: 'club_name',
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
Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Club;
