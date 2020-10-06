import { AuthInterceptor } from './auth-interceptor';
import {
  createServiceFactory,
  createSpyObject,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AuthInterceptor', () => {
  let spectator: SpectatorService<AuthInterceptor>;

  const createService = createServiceFactory({
    service: AuthInterceptor,
    providers: [
      mockProvider(Router, {
        url: 'index',
      }),
    ],
  });

  const dummyRequest = createSpyObject(HttpRequest);

  const interceptWithError = (error: Error) => {
    spectator.service
      .intercept(dummyRequest, {
        handle: () => throwError(error),
      })
      .subscribe(
        () => fail('Should fail'),
        (e) => expect(e).toBe(error)
      );
  };

  // tslint:disable-next-line:no-any
  const interceptWithResponse = (response: HttpResponse<any>) => {
    spectator.service
      .intercept(dummyRequest, {
        handle: () => of(response),
      })
      .subscribe();
  };

  beforeEach(() => {
    spectator = createService();
  });

  it('should redirect an expired user to the login page', () => {
    interceptWithError(new HttpErrorResponse({ status: 498 }));
    expect(spectator.inject<Router>(Router).navigate).toHaveBeenCalledWith(
      ['login'],
      { queryParams: { returnUrl: 'index' } }
    );
  });

  it('should not redirect a not-expired user', () => {
    interceptWithResponse(
      new HttpResponse<any>({ status: 200 })
    );
    expect(spectator.inject<Router>(Router).navigate).not.toHaveBeenCalled();
  });
});
