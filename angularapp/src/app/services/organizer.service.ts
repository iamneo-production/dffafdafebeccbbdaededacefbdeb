import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../../models/player.model';
import { Team } from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private baseUrl = 'http://localhost:8080/api/organizer'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  getUnsoldPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseUrl}/unsold-players`);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`http://localhost:8080/api/admin/teams`);
  }

  assignPlayerToTeam(playerId: number, teamId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/assign-player/${playerId},${teamId}`, {});
  }

  releasePlayerFromTeam(playerId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/release-player/${playerId}`, {});
  }

}
