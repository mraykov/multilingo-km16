import { TestBed } from '@angular/core/testing';

import { TranslationsService } from './translations.service';
import { HttpClient } from '@angular/common/http';

describe('TranslationsService', () => {

  const http = {
    get() { },
    post() { },
    put() { },
    patch() { },
    delete() { },
  };

  let getService: () => TranslationsService;

  beforeEach(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [TranslationsService, HttpClient]
    })
      .overrideProvider(HttpClient, { useValue: http });

    getService = () => TestBed.get(TranslationsService);
  });

  it('should be created', () => {
    const service: TranslationsService = getService();
    expect(service).toBeTruthy();
  });
});
