import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLabelComponent } from './register-label.component';

describe('RegisterLabelComponent', () => {
  let component: RegisterLabelComponent;
  let fixture: ComponentFixture<RegisterLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
