import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAVisitComponent } from './make-a-visit.component';

describe('MakeAVisitComponent', () => {
  let component: MakeAVisitComponent;
  let fixture: ComponentFixture<MakeAVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
