import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMensualComponent } from './menu-mensual.component';

describe('MenuMensualComponent', () => {
  let component: MenuMensualComponent;
  let fixture: ComponentFixture<MenuMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
