import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfile should return profile object', (done) => {
    const mock = { '1': { profile: 'Conservador' } };

    service.getProfile(1).subscribe(res => {
      expect(res).toEqual(mock['1']);
      done();
    });

    const req = httpMock.expectOne('/assets/mocks/profiles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
