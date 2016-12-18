import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { DeviceComponent } from './pages/device/device.component';
import { HeartbeatComponent } from './pages/heartbeat/heartbeat.component';

const routes: Routes = [
    // Root
    { path: '', component: HomeComponent },
    { path: 'devices', component: DeviceComponent },
    { path: 'heartbeat', component: HeartbeatComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
