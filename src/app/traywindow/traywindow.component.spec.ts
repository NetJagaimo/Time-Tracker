import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraywindowComponent } from './traywindow.component';

describe('TraywindowComponent', () => {
  let component: TraywindowComponent;
  let fixture: ComponentFixture<TraywindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraywindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraywindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
