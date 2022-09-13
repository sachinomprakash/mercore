import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipWrappperComponent } from './cip-wrappper.component';

describe('CipWrappperComponent', () => {
    let component: CipWrappperComponent;
    let fixture: ComponentFixture<CipWrappperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CipWrappperComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CipWrappperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
