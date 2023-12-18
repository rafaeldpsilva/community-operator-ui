import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { DemandResponseComponent }       from '../../pages/demandresponse/demandresponse.component';
import { CommunityComponent }           from '../../pages/community/community.component';
import { BatteriesComponent }            from '../../pages/batteries/batteries.component';
//import { TypographyComponent }      from '../../pages/typography/typography.component';
//import { IconsComponent }           from '../../pages/icons/icons.component';
//import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    DemandResponseComponent,
    CommunityComponent,
    BatteriesComponent
    //UserComponent,
    //TypographyComponent,
    //IconsComponent,
    //NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
