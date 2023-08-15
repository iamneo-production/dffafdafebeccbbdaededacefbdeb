import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() players: Player[] = [];
  @Input() editedPlayer: Player | null = null;
  @Output() editPlayerEvent = new EventEmitter<Player>();
  @Output() saveEditedPlayerEvent = new EventEmitter<void>();
  @Output() cancelEditPlayerEvent = new EventEmitter<void>();
  @Output() deletePlayerEvent = new EventEmitter<number>();

  onEditPlayer(player: Player): void {
    this.editPlayerEvent.emit(player);
  }

  onSaveEditedPlayer(): void {
    this.saveEditedPlayerEvent.emit();
  }

  onCancelEditPlayer(): void {
    this.cancelEditPlayerEvent.emit();
  }

  onDeletePlayer(playerId: number): void {
    this.deletePlayerEvent.emit(playerId);
  }
}
