import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificatorService } from '../../../core/services/notificator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslationsService } from '../translations.service';
import { TranslationDTO } from '../models/translation.dto';
import { Subscription } from 'rxjs';
import { TranslationsInfoModalComponent } from '../translations-info-modal/translations-info-modal.component';
import { UpdateTranslationDTO } from '../models/update-translation.dto';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-translations-info',
  templateUrl: './translations-info.component.html',
  styleUrls: ['./translations-info.component.scss']
})
export class TranslationsInfoComponent implements OnInit, OnDestroy {
  public translation: TranslationDTO;
  private editTranslationModalSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly translationsService: TranslationsService,
    private readonly notification: NotificatorService,
    private readonly adminService: AdminService,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        ({ translation }) => {
          this.translation = translation;
        },
        err => {
          this.notification.error('Something went wrong!');
        },
      );
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }

  public editTranslation() {
    const modalRef = this.modalService.open(TranslationsInfoModalComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.translation = this.translation;
    this.editTranslationModalSubscription = modalRef.componentInstance.updatedTranslationEm.subscribe(
      (data: UpdateTranslationDTO) => {
        this.translationsService.editTranslationById(this.translation.id, data)
          .subscribe(
            translation => this.translation = translation,
            err => this.notification.error('Something went wrong with translation!'),
          );
      },
      err => this.notification.error('Something went wrong with translation modal!'),
    );
    modalRef.result
      .finally(() => this.editTranslationModalSubscription.unsubscribe());
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }

}
