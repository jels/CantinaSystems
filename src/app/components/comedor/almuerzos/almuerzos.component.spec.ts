import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmuerzosComponent } from './almuerzos.component';

describe('AlmuerzosComponent', () => {
  let component: AlmuerzosComponent;
  let fixture: ComponentFixture<AlmuerzosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmuerzosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmuerzosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
