import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipStructureComponent } from './ownership-structure.component';

describe('OwnershipStructureComponent', () => {
    let component: OwnershipStructureComponent;
    let fixture: ComponentFixture<OwnershipStructureComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OwnershipStructureComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OwnershipStructureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
