import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuizComponent } from './profile-quiz.component';

describe('ProfileQuiz', () => {
  let component: ProfileQuizComponent;
  let fixture: ComponentFixture<ProfileQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
