/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [CommonModule]
})
export class MaterializeIconModule {
}
