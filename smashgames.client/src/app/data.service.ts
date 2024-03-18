import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Studio } from './Models/studio';
import { Game } from './Models/game';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  studio$: BehaviorSubject<Studio> = new BehaviorSubject<Studio>({
    name: '',
    description: '',
    games: {
      $values: []
    }
  });

  games$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);


  constructor(private http: HttpClient) {
    //hook up our api to return the studio infromation and save back as the next value of this.studio
    this.getStudio(1);
  }

  // get all studios
  getAllStudios(): Observable<Studio[]> {
    return this.http.get<Studio[]>('/api/Studios');
  }
  getStudio(id: number) {
    this.http.get<Studio>('api/Studios/' + id).subscribe(data => {
      this.studio$.next(data);
      this.games$.next(data.games.$values);
    });
  }
}
