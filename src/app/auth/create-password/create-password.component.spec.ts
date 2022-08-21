import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePasswordComponent } from './create-password.component';

describe('ForgotPasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreatePasswordComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreatePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
