import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlmuerzoComponent } from './new-almuerzo.component';

describe('NewAlmuerzoComponent', () => {
  let component: NewAlmuerzoComponent;
  let fixture: ComponentFixture<NewAlmuerzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAlmuerzoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAlmuerzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
