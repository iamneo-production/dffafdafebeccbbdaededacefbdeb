import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team);
  }

  updateTeam(teamId: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams/${teamId}`, team);
  }

  deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teams/${teamId}`);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/players`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/players`, player);
  }

  updatePlayer(playerId: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.baseUrl}/players/${playerId}`, player);
  }

  deletePlayer(playerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/players/${playerId}`);
  }
}
