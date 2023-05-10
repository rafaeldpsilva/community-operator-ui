import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DemandResponseComponent } from '../../pages/demandresponse/demandresponse.component';
import { UserComponent } from '../../pages/user/user.component';
import { CommunityComponent } from '../../pages/community/community.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'demandresponse',      component: DemandResponseComponent },
    { path: 'community',          component: CommunityComponent }
    //{ path: 'user',           component: UserComponent },
    //{ path: 'typography',     component: TypographyComponent },
    //{ path: 'icons',          component: IconsComponent },
    //{ path: 'notifications',  component: NotificationsComponent }
];
