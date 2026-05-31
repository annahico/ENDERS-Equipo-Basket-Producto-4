import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../models/player';
import { MediaComponent } from '../media-component/media-component';
import { PlayersService } from '../../services/players.service';


@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [MediaComponent, FormsModule],
  templateUrl: './detail-component.html',
  styleUrl: './detail-component.css',
})
export class DetailComponent {
  private playersService = inject(PlayersService);

  currentVideoIndex = 0;
  isEditing = false;

  @Input()
  player?: Player;

  @Output()
  closeDetail = new EventEmitter<void>();

  editablePlayer:Player = {
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: 0,
    altura: 0,
    foto: '',
    videos: ['', '']
  };

  close(){
    this.closeDetail.emit();
  }
  hasMultipleVideos(): boolean {
    return (this.player?.videos?.length ?? 0) > 1;
  }
  nextVideo(){
    if(!this.player) return;

    if(this.currentVideoIndex < this.player.videos.length -1){
      this.currentVideoIndex++;
    }
  }
  prevVideo(){
    if(this.currentVideoIndex > 0){
      this.currentVideoIndex--;
    }
  }
  startEdit(){
    if(!this.player) return;
    this.isEditing = true;
    const videos = [...(this.player.videos ?? [])];
    this.editablePlayer = {
      id: this.player.id,
      nombre: this.player.nombre,
      apellidos: this.player.apellidos,
      posicion: this.player.posicion,
      edad: this.player.edad,
      altura: this.player.altura,
      foto: this.player.foto,
      videos: [
        videos[0] ?? '',
        videos[1] ?? ''
      ]
    };
  }
  cancelEdit(){
    this.isEditing = false;
  }
  async saveEdit(){
    if(!this.player?.id) return;

    try{
      const updatedData =  {
        nombre: this.editablePlayer.nombre,
        apellidos: this.editablePlayer.apellidos,
        posicion: this.editablePlayer.posicion,
        edad: this.editablePlayer.edad,
        altura: this.editablePlayer.altura,
        foto: this.editablePlayer.foto,
        videos: this.editablePlayer.videos
      };

      await this.playersService.updatePlayer(this.player.id, updatedData);

      this.player = {
        ...this.player,
        ...updatedData
      };

      this.isEditing = false;
      this.closeDetail.emit();
    }catch (error){
      console.log('Error al actualizar jugador', error);
    }
  }
  ngOnChanges(){
    this.currentVideoIndex = 0;
  }
}
