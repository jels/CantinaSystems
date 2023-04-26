import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDiarioComponent } from './ver-diario.component';

describe('VerDiarioComponent', () => {
  let component: VerDiarioComponent;
  let fixture: ComponentFixture<VerDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
