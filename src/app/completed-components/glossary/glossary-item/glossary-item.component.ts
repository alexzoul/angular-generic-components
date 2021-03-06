/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { config } from '../../../config';
import { GlossaryItemModel } from './glossary-item.model';

@Component({
  selector: `${ config.components.prefix }-glossary-item`,
  templateUrl: './glossary-item.component.html'
})
export class GlossaryItemComponent implements GlossaryItemModel {
  static readonly defaultProps: GlossaryItemModel = {
    className: '',
    referenceId: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input() className: string = GlossaryItemComponent.defaultProps.className;
  @Input() referenceId: string = GlossaryItemComponent.defaultProps.referenceId;

  public prefix = config.components.prefix;

  public isActive: boolean;

  constructor() {
    this.isActive = false;
    this.onClickEmitter = new EventEmitter<string>();
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    this.onClickEmitter.emit(this.referenceId);
  }
}
