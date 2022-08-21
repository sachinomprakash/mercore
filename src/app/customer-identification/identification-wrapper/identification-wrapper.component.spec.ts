import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationWrapperComponent } from './identification-wrapper.component';

describe('IdentificationWrapperComponent', () => {
    let component: IdentificationWrapperComponent;
    let fixture: ComponentFixture<IdentificationWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IdentificationWrapperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IdentificationWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
