import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnalComponent } from './donnal.component';

describe('DonnalComponent', () => {
  let component: DonnalComponent;
  let fixture: ComponentFixture<DonnalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonnalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
