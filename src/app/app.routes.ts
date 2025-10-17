import { Routes } from '@angular/router';
import { DialerComponent } from './dialer/dialer';

export const routes: Routes = [
  { path: '', component: DialerComponent },  // anasayfa = dialer
  { path: '**', redirectTo: '' }
];
