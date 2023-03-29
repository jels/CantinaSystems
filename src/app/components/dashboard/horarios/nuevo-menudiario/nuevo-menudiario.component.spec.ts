import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMenudiarioComponent } from './nuevo-menudiario.component';

describe('NuevoMenudiarioComponent', () => {
  let component: NuevoMenudiarioComponent;
  let fixture: ComponentFixture<NuevoMenudiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoMenudiarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoMenudiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
