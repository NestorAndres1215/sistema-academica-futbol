import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraAdminComponent } from './contra-admin.component';

describe('ContraAdminComponent', () => {
  let component: ContraAdminComponent;
  let fixture: ComponentFixture<ContraAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
