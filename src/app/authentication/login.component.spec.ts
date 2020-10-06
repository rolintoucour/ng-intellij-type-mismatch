import { LoginComponent } from './login.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fakeAsync } from '@angular/core/testing';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;

  const createComponent = createComponentFactory({
    component: LoginComponent,
    providers: [
      mockProvider(ActivatedRoute, {
        snapshot: {
          queryParams: {
            returnUrl: 'index',
          },
        },
      }),
    ],
    imports: [ReactiveFormsModule, FormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

});
