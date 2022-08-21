import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CipService } from 'src/app/utils/services/httpServices/cip.service';
import { StaticService } from 'src/app/utils/services/httpServices/static.service';
import { UtilsModule } from 'src/app/utils/utils.module';

import { RequestTypeComponent } from './request-type.component';

describe('RequestTypeComponent', () => {
    let component: RequestTypeComponent;
    let fixture: ComponentFixture<RequestTypeComponent>;
    let el: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequestTypeComponent],
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
                RouterTestingModule,
                UtilsModule,
                MaterialModule
            ],
            providers: [CipService, StaticService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestTypeComponent);
        component = fixture.componentInstance;
        window.scroll = jest.fn();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should call static api on component load', inject(
        [StaticService],
        (staticService: StaticService) => {
            fixture.whenStable().then(() => {
                const spy = jest.spyOn(staticService, 'getProductMaster');
                // spy.mockReturnValue();
                expect(spy).toHaveBeenCalled();
            });
        }
    ));

    it('checkbox should be checked', async () => {
        fixture.whenStable().then(() => {
            const de = fixture.debugElement.query(By.css('mat-checkbox'));
            el = de.nativeElement;
            el.click();
        });
    });

    it('searchInput should update value when input changes', async () => {
        const testValue = 'Import';
        const hostElement = fixture.nativeElement;
        const nameInput: HTMLInputElement = hostElement.querySelector('#search');
        expect(fixture.debugElement.nativeElement.value).toBeFalsy();

        fixture.whenStable().then(val => {
            nameInput.value = testValue;
            nameInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(fixture.componentInstance.onSearch).toEqual(testValue);
        });
    });

    it('should call api on trigger next method then handle success flow', inject(
        [CipService],
        (cipService: CipService) => {
            fixture.whenStable().then(() => {
                const spy = jest.spyOn(cipService, 'addCIP');
                // spy.mockReturnValue();
                el = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
                el.click();
                component.next();
                expect(spy).toHaveBeenCalled();
            });
        }
    ));
});
