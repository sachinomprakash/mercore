import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedIndividualComponent } from './connected-individual.component';

describe('ConnectedIndividualComponent', () => {
    let component: ConnectedIndividualComponent;
    let fixture: ComponentFixture<ConnectedIndividualComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConnectedIndividualComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConnectedIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
