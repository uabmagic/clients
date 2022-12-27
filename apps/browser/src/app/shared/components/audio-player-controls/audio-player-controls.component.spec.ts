import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerControlsComponent } from './audio-player-controls.component';

describe('AudioPlayerControlsComponent', () => {
  let component: AudioPlayerControlsComponent;
  let fixture: ComponentFixture<AudioPlayerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioPlayerControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioPlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
