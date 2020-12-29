import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreVisitDetailsComponent } from './more-visit-details.component';

describe('MoreVisitDetailsComponent', () => {
  let component: MoreVisitDetailsComponent;
  let fixture: ComponentFixture<MoreVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
