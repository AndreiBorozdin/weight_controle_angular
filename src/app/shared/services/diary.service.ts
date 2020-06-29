import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Diary} from "../models/diary";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Diary[]> {
    return this.http.get<Diary[]>(`/api/diary`)
  }

  create(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>('/api/diary', diary)
  }

  remove(id: string): Observable<any> {
    return this.http.delete<any>(`/api/diary/${id}`)
  }

  update(diary: Diary): Observable<Diary> {
    return this.http.patch<Diary>(`/api/diary/${diary._id}`, {
      everyDayWeight: diary.everyDayWeight,
      created: new Date()
    })
  }
}
