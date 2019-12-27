import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TranslationDTO } from '../models/translation.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTranslationDTO } from '../models/update-translation.dto';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-translations-info-modal',
  templateUrl: './translations-info-modal.component.html',
  styleUrls: ['./translations-info-modal.component.scss']
})
export class TranslationsInfoModalComponent implements OnInit, OnDestroy {
  @Input() public translation: TranslationDTO;
  @Output() public updatedTranslation: UpdateTranslationDTO;
  public updatedTranslationEm = new EventEmitter<UpdateTranslationDTO>();
  public translationForm: FormGroup;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService
  ) {
    this.translationForm = this.fb.group({
      translation: ['',
        Validators.compose([Validators.required])
      ],
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }

  ngOnInit() {
    this.translationForm.setValue({
      translation: this.translation.translation,
    });
  }

  public close() {
    this.modalService.dismissAll();
  }

  public save() {
    this.updatedTranslation = {
      text: this.translationForm.value.translation,
      targetLanguage: this.translation.targetLanguage,
    };
    this.updatedTranslationEm.emit(this.updatedTranslation);
    this.modalService.dismissAll();
  }

  private rows() {
    return this.translation.translation.length <= 50 ? 1 : Math.floor(this.translation.translation.length / 50);
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
