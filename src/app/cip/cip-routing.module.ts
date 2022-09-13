import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationWrapperComponent } from '../customer-identification/identification-wrapper/identification-wrapper.component';
// import { IdentificationWrapperComponent } from '../customer-identification/identification-wrapper/identification-wrapper.component';
import { routeConstant } from '../utils/constants/route.constant';
import { CIPResolverService } from '../utils/services/resolvers/cip-resolver';
import { CipWrappperComponent } from './cip-wrappper/cip-wrappper.component';
import { CompanyInformationComponent } from './company-information/company-information.component';
import { CompanyTypeComponent } from './company-type/company-type.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: routeConstant.welcome
    },
    {
        path: routeConstant.welcome,
        component: WelcomeScreenComponent,
        resolve: { cipData: CIPResolverService }
    },
    {
        path: routeConstant.cip,
        component: CipWrappperComponent,
        children: [
            { path: '', redirectTo: routeConstant.companyType, pathMatch: 'full' },
            {
                path: routeConstant.companyType,
                component: CompanyTypeComponent,
                pathMatch: 'full'
            },
            {
                path: routeConstant.productSelection,
                component: ProductInformationComponent,
                pathMatch: 'full'
            },
            {
                path: routeConstant.copanyInfo,
                component: CompanyInformationComponent,
                pathMatch: 'full'
            },
            {
                path: routeConstant.tradingInfo,
                component: ProductInformationComponent,
                pathMatch: 'full'
            }
        ]
        // resolve: { cipData: CIPResolverService }
    }
    // {
    //     path: routeConstant.welcome,
    //     component: WelcomeScreenComponent,
    //     resolve: { cipData: CIPResolverService }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CipRoutingModule {}

// Check this
