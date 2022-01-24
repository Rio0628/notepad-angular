import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNoteViewComponent } from './main-note-view.component';

describe('MainNoteViewComponent', () => {
  let component: MainNoteViewComponent;
  let fixture: ComponentFixture<MainNoteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNoteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
