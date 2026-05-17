import { Component, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { Player } from '../../models/player';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './players-component.html',
  styleUrl: './players-component.css',
})
export class PlayersComponent {
  private playersService = inject(PlayersService);
  private cdr = inject(ChangeDetectorRef);

  players: Player[] = [];
  filteredPlayers: Player[] = [];
  showFilters = false;
  mostrarFormulario = false;
  searchText: string = '';
  positionFilter: string = '';
  ageFilter?: number;
  videoInput: string = '';

  nuevoJugador: Player = {
    id: '',
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: 0,
    altura: 0.0,
    foto: '',
    videos: []
  };

  @Output()
  playerSelected = new EventEmitter<Player>();

  ngOnInit() {
    this.playersService.getPlayers().subscribe(data => {
      this.players = data;
      this.filteredPlayers = data;
      this.cdr.detectChanges();
    });
  }

  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }

  applyFilters() {
    this.filteredPlayers = this.players.filter(player => {
      const matchName =
        player.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        player.apellidos.toLowerCase().includes(this.searchText.toLowerCase());
      const matchPosition =
        this.positionFilter === '' || player.posicion === this.positionFilter;
      const matchAge =
        !this.ageFilter || player.edad <= this.ageFilter;
      return matchName && matchPosition && matchAge;
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async addPlayer() {
    const jugadorNuevo: Omit<Player, 'id'> = {
      nombre: this.nuevoJugador.nombre,
      apellidos: this.nuevoJugador.apellidos,
      posicion: this.nuevoJugador.posicion,
      edad: this.nuevoJugador.edad,
      altura: this.nuevoJugador.altura,
      foto: this.nuevoJugador.foto,
      videos: this.videoInput ? [this.videoInput] : []
    };

    try {
      await this.playersService.addPlayer(jugadorNuevo as Player);
      this.nuevoJugador = {
        id: '',
        nombre: '',
        apellidos: '',
        posicion: '',
        edad: 0,
        altura: 0.0,
        foto: '',
        videos: []
      };
      this.videoInput = '';
      this.mostrarFormulario = false;
    } catch(error) {
      console.error('Error al añadir jugador', error);
    }
  }

  async deletePlayer(id: string) {
    try {
      await this.playersService.deletePlayer(id);
    } catch(error) {
      console.error('Error al borrar jugador', error);
    }
  }
}