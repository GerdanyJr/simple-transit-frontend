import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReportComponent } from './pages/report/report.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CreateReportComponent } from './pages/create-report/create-report.component';

export const routes: Routes = [
    {
        path: "auth",
        component: AuthLayoutComponent,
        children: [
            {
                path: "login",
                title: "Entrar",
                component: LoginComponent
            },
            {
                path: "signup",
                title: "Cadastre-se",
                component: SignupComponent
            },
            {
                path: "**",
                redirectTo: "login"
            }
        ]
    },
    {
        path: "",
        component: AppLayoutComponent,
        children: [
            {
                path: "dashboard",
                title: "Dashboard",
                component: DashboardComponent
            },
            {
                path: "reports",
                title: "Ocorrências",
                children: [
                    {
                        path: "",
                        component: ReportsComponent
                    },
                    {
                        path: "create-report",
                        component: CreateReportComponent
                    },
                    {
                        path: ":id",
                        component: ReportComponent
                    }
                ]
            },
            {
                path: "**",
                redirectTo: "dashboard"
            }
        ]
    },
];
