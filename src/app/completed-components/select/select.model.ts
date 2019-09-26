/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

export interface SelectModel {
  className: string;
  disabled: boolean;
  floatLabel: string;
  id: string | null;
  isNativeControl: boolean;
  name: string;
  required: boolean;
  value: string | number | boolean | null;
}
