import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CddWrapperComponent } from './cdd-wrapper.component';

describe('CddWrapperComponent', () => {
    let component: CddWrapperComponent;
    let fixture: ComponentFixture<CddWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CddWrapperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CddWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
