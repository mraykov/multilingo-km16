import { TestBed } from '@angular/core/testing';
import { RatingService } from './rating.service';
import { HttpClient } from '@angular/common/http';
import { CreateRateDTO } from './models/rate/create-rate.dto';
import { of } from 'rxjs';
import { DOMAIN } from '../../config/domain.config';

describe('RatingService', () => {

  const http = {
    post() { },
    get() { }
  };

  let getService: () => RatingService;

  beforeEach(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [RatingService, HttpClient]
    })
      .overrideProvider(HttpClient, { useValue: http });

    getService = () => TestBed.get(RatingService);
  });

  it('should be created', () => {
    const service: RatingService = getService();
    expect(service).toBeTruthy();
  });

  it('rate() should call http.post with the correct parameters', () => {

    const avgRating = new CreateRateDTO();
    const route = `${DOMAIN.API_DOMAIN_NAME}/translations/rate`;

    const spy = jest.spyOn(http, 'post').mockImplementation(() => of(avgRating));

    const service = getService();
    const rating = new CreateRateDTO();

    service.rate(rating);

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenLastCalledWith(route, rating);

  });

  it('getRate() should call http.post with the correct parameters', () => {

    const avgRating = new CreateRateDTO();
    const translationId = 45;
    const route = `${DOMAIN.API_DOMAIN_NAME}/translations/${translationId}/rate`;

    const spy = jest.spyOn(http, 'get').mockImplementation(() => of(avgRating));

    const service = getService();

    service.getRate(translationId);

    expect(http.get).toHaveBeenCalledTimes(1);
    expect(http.get).toHaveBeenLastCalledWith(route);

  });

});
