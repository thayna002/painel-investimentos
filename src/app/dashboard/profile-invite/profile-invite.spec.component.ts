import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInviteComponent } from './profile-invite.component';
import { beforeEach, describe, it } from 'node:test';

describe('ProfileInviteComponent', () => {
  let component: ProfileInviteComponent;
  let fixture: ComponentFixture<ProfileInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
function expect(component: ProfileInviteComponent) {
  throw new Error('Function not implemented.');
}

