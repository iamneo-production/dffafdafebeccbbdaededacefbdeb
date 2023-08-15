import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../services/organizer.service';
import { Player } from '../../models/player.model';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  unsoldPlayers: Player[]=[{ id: 1, name: 'Player X', age: 25, category: 'Category A', biddingPrice: 50 },
  { id: 2, name: 'Player Y', age: 28, category: 'Category B', biddingPrice: 60 },
  ];
  teams: Team[]=[
    { id: 1, name: 'Team A', maximumBudget: 100 },
    { id: 2, name: 'Team B', maximumBudget: 150 },];
  categories: string[]=[]; // Assuming you have a list of categories from the backend
  selectedCategory: string = '';



  constructor(private organizerService: OrganizerService) { }

  ngOnInit(): void {
    this.getUnsoldPlayers();
    this.getTeams();
    this.getCategories();
  }

  getUnsoldPlayers(): void {
    this.organizerService.getUnsoldPlayers().subscribe((players) => {
      this.unsoldPlayers = players;
    });
  }

  getTeams(): void {
    this.organizerService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  getCategories(): void {
    // You need to implement a service method to fetch the categories from the backend.
    // For example: this.organizerService.getCategories().subscribe((categories) => this.categories = categories);
  }

  filterPlayers(): void {
    if (this.selectedCategory) {
      this.unsoldPlayers = this.unsoldPlayers.filter((player) => player.category === this.selectedCategory);
    } else {
      this.getUnsoldPlayers();
    }
  }

  // assignPlayerToTeam(player: Player): void {
  //   player.assignplayer = true;
  //   if (!player.selectedTeamId) {
  //     return; // No team selected, do nothing
  //   }

  //   this.organizerService.assignPlayerToTeam(player.id, player.selectedTeamId).subscribe(() => {
  //     // After assigning the player, remove them from the unsoldPlayers list
  //     this.assignTeam(player.id, player.selectedTeamId)
  //     //this.unsoldPlayers = this.unsoldPlayers.filter(p => p !== player);
  //   });
  // }
  assignPlayerToTeam(player: Player): void {
    if (!player.selectedTeamId) {
      return; // No team selected, do nothing
    }
    console.log(player.selectedTeamId);
    console.log(player.id);

    this.organizerService.assignPlayerToTeam(player.id, player.selectedTeamId).subscribe(() => {
      // After assigning the player, remove them from the unsoldPlayers list
      this.unsoldPlayers = this.unsoldPlayers.filter(p => p !== player);
    });
  }

    // releasePlayerFromTeam(team: Team): void {
    //   // Implement the release player from team functionality here
    // }
    releasePlayerFromTeam(team: Team): void {
      this.organizerService.releasePlayerFromTeam(team.id).subscribe(() => {
        // After releasing the player, fetch the updated unsold players list
        this.getUnsoldPlayers();
      });
    }

    assignTeam(team: Team, player: Player): void{
    this.organizerService.assignPlayerToTeam(player.id,team.id).subscribe(() => {
      // After releasing the player, fetch the updated unsold players list
      this.getUnsoldPlayers();
    });
  }
}
