import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingInfoComponent } from './trading-info.component';

describe('TradingInfoComponent', () => {
    let component: TradingInfoComponent;
    let fixture: ComponentFixture<TradingInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TradingInfoComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TradingInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
