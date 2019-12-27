import { TestBed } from '@angular/core/testing';

import { LanguagesService } from './languages.service';
import { HttpClient } from '@angular/common/http';

describe('LanguagesService', () => {
  const http = {
    get() { },
    post() { },
    put() { },
    patch() { },
    delete() { },
  };

  let getService: () => LanguagesService;

  beforeEach(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [LanguagesService, HttpClient]
    })
      .overrideProvider(HttpClient, { useValue: http });

    getService = () => TestBed.get(LanguagesService);
  });

  it('should be created', () => {
    const service: LanguagesService = getService();
    expect(service).toBeTruthy();
  });
});
