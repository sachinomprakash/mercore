import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTableComponent } from './icon-table.component';

describe('IconTableComponent', () => {
    let component: IconTableComponent;
    let fixture: ComponentFixture<IconTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IconTableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
