import { Player } from './player.model';

describe('Player Models', () => {
  fit('should create a Player instance', () => {
    const player: Player = {
      name: 'John',
      age: 25,
      category: 'A',
      biddingPrice: 100,
      selectedTeamId: 1
    };
    expect(player).toBeTruthy();
    expect(player.name).toBe('John');
    expect(player.age).toBe(25);
    expect(player.category).toBe('A');
    expect(player.biddingPrice).toBe(100);
    expect(player.selectedTeamId).toBe(1);
  });

  fit('should create a Player instance with default values', () => {
    const player: Player = {
      name: 'Jane',
      age: 30
    };
    expect(player).toBeTruthy();
    expect(player.name).toBe('Jane');
    expect(player.age).toBe(30);
    expect(player.category).toBeUndefined();
    expect(player.biddingPrice).toBeUndefined();
    expect(player.selectedTeamId).toBeUndefined();
  });
});
