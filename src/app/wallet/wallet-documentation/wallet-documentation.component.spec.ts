import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDocumentationComponent } from './wallet-documentation.component';

describe('WalletDocumentationComponent', () => {
    let component: WalletDocumentationComponent;
    let fixture: ComponentFixture<WalletDocumentationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WalletDocumentationComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WalletDocumentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
