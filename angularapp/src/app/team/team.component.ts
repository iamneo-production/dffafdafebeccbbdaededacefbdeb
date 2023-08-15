import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/models/team.model';
import { AdminService } from '../services/admin.service';
import { Player } from 'src/models/player.model';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  constructor(private adminService: AdminService) { }


  ngOnInit(): void {
    // this.getTeams();
    // this.getPlayers();
  }
  @Input() teams: Team[] = [];
  @Input() players: Player[] = [];

  @Input() editedTeam: Team | null = null;
  @Output() editTeamEvent = new EventEmitter<Team>();
  @Output() saveEditedTeamEvent = new EventEmitter<void>();
  @Output() cancelEditTeamEvent = new EventEmitter<void>();
  @Output() deleteTeamEvent = new EventEmitter<number>();

  // editedTeam: Team | null = null;
  editedPlayer: Player | null = null;

  onEditTeam(team: Team): void {
    this.editTeamEvent.emit(team);
  }


  onSaveEditedTeam(): void {
    this.saveEditedTeamEvent.emit();
  }

  onCancelEditTeam(): void {
    this.cancelEditTeamEvent.emit();
  }

  onDeleteTeam(teamId: number): void {
    this.deleteTeamEvent.emit(teamId);
  }

  // getTeams(): void {
  //   console.log(this.teams);

  //   this.adminService.getTeams().subscribe((teams) => {
  //     this.teams = teams;
  //   });
  // }

  // getPlayers(): void {
  //   this.adminService.getPlayers().subscribe((players) => {
  //     this.players = players;
  //   });
  // }

  // editTeam(team: Team): void {
  //   this.editedTeam = { ...team };
  // }

  // saveEditedTeam(): void {
  //   if (this.editedTeam) {
  //     this.adminService.updateTeam(this.editedTeam.id, this.editedTeam).subscribe(() => {
  //       this.getTeams();
  //       this.editedTeam = null;
  //     });
  //   }
  // }

  // cancelEditTeam(): void {
  //   this.editedTeam = null;
  // }

  // editPlayer(player: Player): void {
  //   this.editedPlayer = { ...player };
  // }

  // saveEditedPlayer(): void {
  //   if (this.editedPlayer) {
  //     this.adminService.updatePlayer(this.editedPlayer.id, this.editedPlayer).subscribe(() => {
  //       this.getPlayers();
  //       this.editedPlayer = null;
  //     });
  //   }
  // }

  // cancelEditPlayer(): void {
  //   this.editedPlayer = null;
  // }

  // deleteTeam(teamId: number): void {
  //   this.adminService.deleteTeam(teamId).subscribe(() => {
  //     this.getTeams();
  //   });
  // }

  // deletePlayer(playerId: number): void {
  //   this.adminService.deletePlayer(playerId).subscribe(() => {
  //     this.getPlayers();
  //   });
  // }

}
