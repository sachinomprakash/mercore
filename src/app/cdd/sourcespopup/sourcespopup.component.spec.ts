import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcespopupComponent } from './sourcespopup.component';

describe('SourcespopupComponent', () => {
    let component: SourcespopupComponent;
    let fixture: ComponentFixture<SourcespopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SourcespopupComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcespopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
