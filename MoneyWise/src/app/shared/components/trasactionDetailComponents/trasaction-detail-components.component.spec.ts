import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrasactionDetailComponentsComponent } from './trasaction-detail-components.component';

describe('TrasactionDetailComponentsComponent', () => {
  let component: TrasactionDetailComponentsComponent;
  let fixture: ComponentFixture<TrasactionDetailComponentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasactionDetailComponentsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrasactionDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
