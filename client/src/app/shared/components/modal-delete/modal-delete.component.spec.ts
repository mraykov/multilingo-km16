import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteComponent } from './modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AdminService } from '../../../features/admin/admin.service';

describe('ArticleInputFieldComponent', () => {

  const adminService = {
    uiBlocks$: of('Data'),
  };

  const modalService = {
    dismissAll() {},
  };

  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [],
      declarations: [ ModalDeleteComponent ],
      providers: [
        NgbModal,
        AdminService,
      ]
    })
    .overrideProvider(AdminService, { useValue: adminService })
    .overrideProvider(NgbModal, { useValue: modalService })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should initialize correctly with the data passed from the AdminService', (done) => {
      // Assert
      expect(component.uiBlocks).toEqual('Data');

      done();
    });

    it('should when initialized uiBlocksSubscription to not be undefined', (done) => {
      // Assert

      expect((component as any).uiBlocksSubscription).not.toEqual(undefined);
      done();
    });
  });

  describe('close()', () => {
    it('should call modalService.dismissAll()', (done) => {
      // Arrange
      const spy = jest.spyOn(modalService, 'dismissAll');

      // Act
      component.close();

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalled();

      done();
    });
  });

  describe('delete()', () => {
    it('should call modalService.dismissAll()', (done) => {
      // Arrange
      const spy = jest.spyOn(modalService, 'dismissAll');

      // Act
      component.delete();

      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalled();

      done();
    });

    it('should call deleteEvent.emit() and emit value true', (done) => {
      // Act
      component.delete();

      // Assert
      component.deleteEvent.subscribe(
        data => {
          expect(data).toBe(true);
        }
      );

      done();
    });
  });

});
