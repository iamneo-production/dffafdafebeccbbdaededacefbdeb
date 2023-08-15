import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { AdminService } from '../services/admin.service';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { PlayerComponent } from '../player/player.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockAdminService: jasmine.SpyObj<AdminService>;
  let debugElement: DebugElement;


  beforeEach(() => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', [
      'getTeams', 'createTeam', 'getPlayers', 'createPlayer', 'deletePlayer' // Add more as needed
    ]);

    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [AdminComponent, TeamComponent, PlayerComponent],
      providers: [
        { provide: AdminService, useValue: adminServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    mockAdminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    debugElement = fixture.debugElement;

  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams on initialization', fakeAsync(() => {
    const mockTeams: Team[] = [
      { id: 1, name: 'Team A', maximumBudget: 100 },
      { id: 2, name: 'Team B', maximumBudget: 150 }
    ];
    mockAdminService.getTeams.and.returnValue(of(mockTeams));

    component.ngOnInit();
    tick();

    expect(component.teams).toEqual(mockTeams);
  }));

  it('should create a team', fakeAsync(() => {
    const mockTeams: Team[] = [
      { name: 'Team A', maximumBudget: 100 },
      { name: 'Team B', maximumBudget: 150 }
    ];
    const newTeam: Team = { name: 'New Team', maximumBudget: 200 };
    mockAdminService.createTeam.and.returnValue(of());
    mockAdminService.getTeams.and.returnValue(of([...mockTeams, newTeam]));

    component.newTeam = newTeam;
    component.createTeam();
    tick();

    expect(mockAdminService.createTeam).toHaveBeenCalled(); // Use mockAdminService instead of component
    expect(mockAdminService.getTeams).toHaveBeenCalled(); // Use mockAdminService instead of component
    expect(component.teams).toEqual([...mockTeams, newTeam]);
    expect(component.newTeam).toEqual({ name: '', maximumBudget: 0 });
  }));

  it('should add a new player on form submission', fakeAsync(() => {
    const initialPlayerCount = component.players.length;
    component.newPlayer = { name: 'New Player', age: 25 };

    component.createPlayer();
    tick();

    expect(component.players.length).toBe(initialPlayerCount + 1);
  }));

  fit('should get teams and players on initialization', () => {
    const mockTeams: Team[] = [{ id: 1, name: 'Team A', maximumBudget: 100000 }];
    const mockPlayers: Player[] = [{ id: 1, name: 'Player 1', age: 25 }];

    mockAdminService.getTeams.and.returnValue(of(mockTeams));
    mockAdminService.getPlayers.and.returnValue(of(mockPlayers));

    fixture.detectChanges();

    expect(component.teams).toEqual(mockTeams);
    expect(component.players).toEqual(mockPlayers);
  });

  it('should display team details', () => {
    const teamElement = fixture.nativeElement.querySelector('.team-list li');
    expect(teamElement.textContent).toContain(component.teams[0].name);
  });

  it('should display player list', () => {
    component.players = [
      { name: 'Player X', age: 22 },
      { name: 'Player Y', age: 28 },
    ];
    fixture.detectChanges();
    const playerElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('.player-item');
    expect(playerElements.length).toBe(2);
  });

  it('should show teamName required error message on admin page', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector('#createTeam');

    const usernameInput = debugElement.query(By.css('#teamName'));
    console.log(usernameInput)
    usernameInput.nativeElement.value = ''; // Set an empty value
    usernameInput.nativeElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();
    console.log("usernameInput")

    tick(); // Advance time to handle async operations

    const errorMessage = debugElement.query(By.css('.error-message'));
    console.log("hai"+errorMessage);


    expect(errorMessage.nativeElement.textContent).toContain('Username is required');
  }));

  it('should show teamName required error message on admin page', fakeAsync(() => {
    const button = debugElement.query(By.css('#createTeam'));

    // Set an empty value for newTeam.name
    component.newTeam.name = '';
    fixture.detectChanges();

    // Click the "Create Team" button
    button.nativeElement.click();
    tick();

    const errorMessage = debugElement.query(By.css('.error-message'));
    expect(errorMessage.nativeElement.textContent).toContain('TeamName is required');
  }));


  // Add more test cases as needed...

});
