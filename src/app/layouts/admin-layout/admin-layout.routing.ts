import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DemandResponseComponent } from '../../pages/demandresponse/demandresponse.component';
import { CommunityComponent } from '../../pages/community/community.component';
import { BatteriesComponent } from '../../pages/batteries/batteries.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'demandresponse',      component: DemandResponseComponent },
    { path: 'community',          component: CommunityComponent },
    { path: 'batteries',          component: BatteriesComponent }
];
