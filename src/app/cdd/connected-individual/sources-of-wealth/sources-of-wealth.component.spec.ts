import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesOfWealthComponent } from './sources-of-wealth.component';

describe('SourcesOfWealthComponent', () => {
    let component: SourcesOfWealthComponent;
    let fixture: ComponentFixture<SourcesOfWealthComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SourcesOfWealthComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SourcesOfWealthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
