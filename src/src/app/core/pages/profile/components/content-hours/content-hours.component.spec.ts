import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHoursComponent } from './content-hours.component';

describe('ContentHoursComponent', () => {
  let component: ContentHoursComponent;
  let fixture: ComponentFixture<ContentHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
