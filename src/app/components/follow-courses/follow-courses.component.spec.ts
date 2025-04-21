import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCoursesComponent } from './follow-courses.component';

describe('FollowCoursesComponent', () => {
  let component: FollowCoursesComponent;
  let fixture: ComponentFixture<FollowCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowCoursesComponent]
    });
    fixture = TestBed.createComponent(FollowCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
