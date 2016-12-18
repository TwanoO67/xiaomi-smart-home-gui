import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { DeviceComponent } from './pages/device/device.component';

const routes: Routes = [
    // Root
    { path: '', component: HomeComponent },
    { path: 'devices', component: DeviceComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
