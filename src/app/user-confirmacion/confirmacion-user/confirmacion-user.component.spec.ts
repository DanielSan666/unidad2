import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionUserComponent } from './confirmacion-user.component';

describe('ConfirmacionUserComponent', () => {
  let component: ConfirmacionUserComponent;
  let fixture: ComponentFixture<ConfirmacionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
