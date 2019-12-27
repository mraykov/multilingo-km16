import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRateDTO } from './models/rate/create-rate.dto';
import { DOMAIN } from '../../config/domain.config';
import { AvgRateDTO } from './models/rate/avg-rate.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public rate(rating: CreateRateDTO): Observable<AvgRateDTO> {
    return this.http.post<AvgRateDTO>(`${DOMAIN.API_DOMAIN_NAME}/translations/rate`, rating);
  }

  public getRate(translationId: number): Observable<AvgRateDTO> {
    return this.http.get<AvgRateDTO>(`${DOMAIN.API_DOMAIN_NAME}/translations/${translationId}/rate`);
  }
}
