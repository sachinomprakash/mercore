import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresssummaryComponent } from './progresssummary.component';

describe('ProgresssummaryComponent', () => {
    let component: ProgresssummaryComponent;
    let fixture: ComponentFixture<ProgresssummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProgresssummaryComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgresssummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
