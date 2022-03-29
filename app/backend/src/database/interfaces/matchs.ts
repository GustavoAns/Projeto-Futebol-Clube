export type MatchsReq = {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  authorization?: string;
};

export type MatchsRes = {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
};

export type Teams = {
  homeTeam: number;
  awayTeam: number;
};
