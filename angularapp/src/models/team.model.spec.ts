import { Team } from './team.model';

describe('Team Models', () => {
  fit('should create a Team instance', () => {
    const team: Team = {
      name: 'Team A',
      maximumBudget: 1000000
    };
    expect(team).toBeTruthy();
    expect(team.name).toBe('Team A');
    expect(team.maximumBudget).toBe(1000000);
  });

  fit('should create a Team instance with default values', () => {
    const team: Team = {
      name: 'Team B',
      maximumBudget: 2000000
    };
    expect(team).toBeTruthy();
    expect(team.name).toBe('Team B');
    expect(team.maximumBudget).toBe(2000000);
  });
});
