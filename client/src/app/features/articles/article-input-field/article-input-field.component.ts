import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleDTO } from '../models/article.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateArticleDTO } from '../models/update-article.dto';

@Component({
  selector: 'app-article-input-field',
  templateUrl: './article-input-field.component.html',
  styleUrls: ['./article-input-field.component.scss']
})
export class ArticleInputFieldComponent implements OnInit {
  @Input() public article: ArticleDTO;
  @Input() public uiBlocks;

  public updatedArticleEm = new EventEmitter<UpdateArticleDTO>();

  public articleForm: FormGroup;

  constructor(
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
  ) {
    this.articleForm = this.fb.group({
      title: ['',
        Validators.compose([Validators.required])
      ],
      content: ['',
        Validators.compose([Validators.required])
      ],
    });
  }

  ngOnInit() {
    this.articleForm.setValue({
      title: this.article.title.text,
      content: this.article.content.text,
    });
  }

  public close() {
    this.modalService.dismissAll();
  }

  public save() {
    this.updatedArticleEm.emit(this.articleForm.value);
    this.modalService.dismissAll();
  }

}
