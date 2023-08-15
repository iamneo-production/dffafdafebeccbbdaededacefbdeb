import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizerComponent } from './organizer.component';
import { OrganizerService } from '../services/organizer.service';
import { of } from 'rxjs';
import { Player } from '../../models/player.model';
import { Team } from '../../models/team.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('OrganizerComponent', () => {
  let component: OrganizerComponent;
  let fixture: ComponentFixture<OrganizerComponent>;
  let mockOrganizerService: jasmine.SpyObj<OrganizerService>;
  let debugElement: DebugElement;

  const mockUnsoldPlayers: Player[] = [
    { name: 'Player 1', age: 25, category: 'Category A' },
    { name: 'Player 2', age: 28, category: 'Category B' },
  ];

  const mockTeams: Team[] = [
    { name: 'Team A', maximumBudget: 1000 },
    { name: 'Team B', maximumBudget: 1500 },
  ];

  beforeEach(() => {
    mockOrganizerService = jasmine.createSpyObj('OrganizerService', ['getUnsoldPlayers', 'getTeams', 'getCategories']);

    TestBed.configureTestingModule({
      declarations: [OrganizerComponent],
      providers: [{ provide: OrganizerService, useValue: mockOrganizerService }],
    });

    fixture = TestBed.createComponent(OrganizerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

  });

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should reset player filter when category is empty', () => {
    component.selectedCategory = 'Category A';
    component.unsoldPlayers = mockUnsoldPlayers;
    component.filterPlayers();
    expect(component.unsoldPlayers.length).toBe(1);
    expect(component.unsoldPlayers[0].category).toBe('Category A');
  });

  it('should display unsold players', () => {
    component.unsoldPlayers = [
      { id: 1, name: 'Player A', age: 25, category: 'Category A' },
      { id: 2, name: 'Player B', age: 28, category: 'Category B' }
    ];
    fixture.detectChanges();

    const playerListItems = debugElement.queryAll(By.css('.unsold-player-item'));
    expect(playerListItems.length).toBe(2);
  });

  it('should display team list', () => {
    component.teams = [
      { id: 1, name: 'Team X', maximumBudget: 100000 },
      { id: 2, name: 'Team Y', maximumBudget: 150000 }
    ];
    fixture.detectChanges();

    const teamListItems = debugElement.queryAll(By.css('.team-item'));
    expect(teamListItems.length).toBe(2);
  });

  it('should fetch unsold players on initialization', () => {
    mockOrganizerService.getUnsoldPlayers.and.returnValue(of(mockUnsoldPlayers));
    fixture.detectChanges();
    expect(component.unsoldPlayers).toEqual(mockUnsoldPlayers);
  });



  // it('should fetch teams on initialization', () => {
  //   mockOrganizerService.getTeams.and.returnValue(of(mockTeams));
  //   fixture.detectChanges();
  //   expect(component.teams).toEqual(mockTeams);
  // });

  // it('should reset player filter when category is empty', () => {
  //   component.selectedCategory = 'Category A';
  //   component.unsoldPlayers = mockUnsoldPlayers;
  //   component.filterPlayers();
  //   expect(component.unsoldPlayers.length).toBe(1);

  //   component.selectedCategory = '';
  //   component.filterPlayers();
  //   expect(component.unsoldPlayers.length).toBe(mockUnsoldPlayers.length);
  // });

  // You can continue writing test cases for assignPlayerToTeam and releasePlayerFromTeam methods
});
