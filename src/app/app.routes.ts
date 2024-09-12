import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
       {path:'',redirectTo:'login',pathMatch:'full'},
       {path:'login',component:LoginComponent},
       {path:'register',component:RegisterComponent},
       {path:'',component:LayoutComponent,
        children:[
            {path:'dashboard',component:DashboardComponent,
             canActivate:[authGuard]
            },
            {path:'list',component:ListComponent}
        ]
       },    
];
