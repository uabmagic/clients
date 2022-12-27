import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNextDialogComponent } from './up-next-dialog.component';

describe('UpNextDialogComponent', () => {
  let component: UpNextDialogComponent;
  let fixture: ComponentFixture<UpNextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpNextDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpNextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
