import { Component, OnInit, inject, signal } from '@angular/core';
import { DetailComponent } from './components/detail-component/detail-component';
import { Player } from './models/player';
import { PlayersComponent } from './components/players-component/players-component';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  imports: [DetailComponent, PlayersComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('equipo-basket-test');
  private notificationsService = inject(NotificationsService);
  view = 'home';

  selectedPlayer?: Player | null;

  ngOnInit(): void {
    this.notificationsService.init();
  }

  onPlayerSelected(player: Player){
    this.selectedPlayer = player;
    document.body.classList.add('model-open');
  }
  closeDetail(){
    this.selectedPlayer = null;
    document.body.classList.remove('model-open')
  }
}
