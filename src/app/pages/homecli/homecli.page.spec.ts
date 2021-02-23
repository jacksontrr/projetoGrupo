import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomecliPage } from './homecli.page';

describe('HomecliPage', () => {
  let component: HomecliPage;
  let fixture: ComponentFixture<HomecliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecliPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomecliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
