import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscaparateComponent } from './escaparate.component';

describe('EscaparateComponent', () => {
  let component: EscaparateComponent;
  let fixture: ComponentFixture<EscaparateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscaparateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscaparateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
