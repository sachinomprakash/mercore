import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFidoComponent } from './on-fido.component';

describe('OnFidoComponent', () => {
    let component: OnFidoComponent;
    let fixture: ComponentFixture<OnFidoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OnFidoComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnFidoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
