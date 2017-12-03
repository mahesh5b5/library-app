import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const comp = TestBed.createComponent(HomeComponent);
    const app = comp.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Dashboard'`, async(() => {
    const comp = TestBed.createComponent(HomeComponent);
    const app = comp.debugElement.componentInstance;
    expect(app.title).toEqual('Dashboard');
  }));
  it('should render title in a h3 tag', async(() => {
    const comp = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = comp.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Books');
  }));
  it(`should be empty 'selectedGenre'`, async(() => {
    const comp = TestBed.createComponent(HomeComponent);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
