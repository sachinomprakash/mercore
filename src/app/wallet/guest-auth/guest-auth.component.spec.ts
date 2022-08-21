import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAuthComponent } from './guest-auth.component';

describe('GuestAuthComponent', () => {
    let component: GuestAuthComponent;
    let fixture: ComponentFixture<GuestAuthComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GuestAuthComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GuestAuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
