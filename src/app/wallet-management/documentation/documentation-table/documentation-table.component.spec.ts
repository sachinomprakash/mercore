import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationTableComponent } from './documentation-table.component';

describe('DocumentationTableComponent', () => {
    let component: DocumentationTableComponent;
    let fixture: ComponentFixture<DocumentationTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DocumentationTableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentationTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
