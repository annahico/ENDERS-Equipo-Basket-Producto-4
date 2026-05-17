import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { environment } from '../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private app = getApps().length ? getApps()[0] : initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);
  private colRef = collection(this.db, 'players');

  getPlayers(): Observable<Player[]> {
    return new Observable(observer => {
      const unsub = onSnapshot(this.colRef, snapshot => {
        const players = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as Player[];
        observer.next(players);
      }, error => observer.error(error));
      return () => unsub();
    });
  }

  addPlayer(player: Player) {
    const { id, ...playerData } = player;
    return addDoc(this.colRef, playerData);
  }

  updatePlayer(id: string, player: Partial<Player>) {
    const playerDoc = doc(this.db, `players/${id}`);
    return updateDoc(playerDoc, player);
  }

  deletePlayer(id: string) {
    const playerDoc = doc(this.db, `players/${id}`);
    return deleteDoc(playerDoc);
  }
}