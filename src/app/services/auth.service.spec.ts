import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should succeed and set localStorage', (done) => {
    localStorage.clear();
    const users = [{ email: 'a@b.com', senha: '123', clientId: 42 }];

    service.login('a@b.com', '123').subscribe(user => {
      expect(user.email).toBe('a@b.com');
      expect(localStorage.getItem('token')).toBe('fake-jwt');
      expect(localStorage.getItem('clientId')).toBe('42');
      done();
    });

    const req = httpMock.expectOne('/assets/mocks/login.json');
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('login should fail with invalid credentials', (done) => {
    service.login('x@y.com', 'zzz').subscribe({
      next: () => fail('expected error'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = httpMock.expectOne('/assets/mocks/login.json');
    req.flush([]);
  });

  it('logout should clear localStorage', () => {
    localStorage.setItem('token', 't');
    localStorage.setItem('clientId', '1');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('clientId')).toBeNull();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });
});
