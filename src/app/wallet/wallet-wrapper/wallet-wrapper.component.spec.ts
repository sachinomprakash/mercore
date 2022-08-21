import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWrapperComponent } from './wallet-wrapper.component';

describe('WalletWrapperComponent', () => {
    let component: WalletWrapperComponent;
    let fixture: ComponentFixture<WalletWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletWrapperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
