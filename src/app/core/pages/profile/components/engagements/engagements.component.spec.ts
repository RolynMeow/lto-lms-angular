import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsComponent } from './engagements.component';

describe('EngagementsComponent', () => {
  let component: EngagementsComponent;
  let fixture: ComponentFixture<EngagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngagementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
