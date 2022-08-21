import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipThankyouComponent } from './cip-thankyou.component';

describe('CipThankyouComponent', () => {
    let component: CipThankyouComponent;
    let fixture: ComponentFixture<CipThankyouComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CipThankyouComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CipThankyouComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
