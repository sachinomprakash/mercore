import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/utils/services/authService/auth.service';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatCardModule,
                MatIconModule,
                MatFormFieldModule,
                BrowserAnimationsModule,
                MatInputModule,
                FormsModule,
                HttpClientModule,
                MatSnackBarModule,
                MatDialogModule,
                RouterTestingModule
            ],
            declarations: [LoginComponent],
            providers: [AuthService]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('form should be invalid without value', async () => {
        component.initLoginForm();
        expect(component.loginForm.invalid).toBeTruthy();
    });
    it("email input should be valid with 'mercore@gmail.com' ", () => {
        component.loginForm.patchValue({ email: 'mercore@gmail.com' });
        expect(component.loginForm.get('email')!.valid).toBeTruthy();
    });

    it('password input should be valid with minimum of 3 characters ', () => {
        component.loginForm.patchValue({ password: 'Admin@123' });
        expect(component.loginForm.get('password')!.valid).toBeTruthy();
    });
    it('form should be valid', () => {
        component.loginForm.patchValue({
            email: 'mercore@gmail.com',
            password: 'Admin@123'
        });
        expect(component.loginForm.valid).toBeTruthy();
    });
    it('should be call auth api on trigger onSubmit method then handle success flow', async(
        inject([AuthService], (authService: AuthService) => {
            component.loginForm.patchValue({
                email: 'abc@gmail.com',
                password: '123'
            });
            const spy = jest.spyOn(authService, 'loginUser');
            spy.mockReturnValue();
            fixture
                .whenStable()
                .then(() => {
                    component.onSubmit();
                    expect(spy).toHaveBeenCalled();
                })
                .catch(err => {
                    console.log(err);
                });
        })
    ));

    it('should not be call auth api on trigger onSubmit method', async(
        inject([AuthService], (authService: AuthService) => {
            const spy = jest.spyOn(authService, 'loginUser');
            spy.mockReturnValue();
            fixture
                .whenStable()
                .then(() => {
                    component.onSubmit();
                    expect(spy).not.toHaveBeenCalled();
                })
                .catch(err => {
                    console.log(err);
                });
        })
    ));
});
