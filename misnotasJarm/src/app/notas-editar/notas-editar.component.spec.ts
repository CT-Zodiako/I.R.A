import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasEditarComponent } from './notas-editar.component';

describe('NotasEditarComponent', () => {
  let component: NotasEditarComponent;
  let fixture: ComponentFixture<NotasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
