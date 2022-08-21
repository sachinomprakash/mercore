import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycVerificationModule } from './kyc-verification/kyc-verification.module';
import { WrapperComponent } from './utils/common-components/wrapper/wrapper.component';
import { AuthGuard } from './utils/services/guards/auth-gaurd.service';
import { PreLoginGuard } from './utils/services/guards/pre-login.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'guest',
        loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule)
    },
    {
        path: 'auth',
        canActivate: [PreLoginGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'kyc-verification',
        // canActivate: [PreLoginGuard],
        loadChildren: () =>
            import('./kyc-verification/kyc-verification.module').then(m => m.KycVerificationModule)
    },
    {
        path: 'customer',
        loadChildren: () =>
            import('./customer-identification/customer-identification.module').then(
                m => m.CustomerIdentificationModule
            ),
        canActivate: [AuthGuard]
    },
    {
        path: 'cdd',
        loadChildren: () => import('./cdd/cdd.module').then(m => m.CddModule),
        canActivate: [AuthGuard]
    }
    // {
    //     path: 'wallet',
    //     loadChildren: () =>
    //         import('./wallet-management/wallet-management.module').then(
    //             m => m.WalletManagementModule
    //         )
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
