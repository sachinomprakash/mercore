import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAccordionComponent } from './progress-accordion.component';

describe('ProgressAccordionComponent', () => {
    let component: ProgressAccordionComponent;
    let fixture: ComponentFixture<ProgressAccordionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProgressAccordionComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressAccordionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
