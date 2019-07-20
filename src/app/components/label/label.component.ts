import { Component, Input, OnInit } from '@angular/core';
import { config } from '../../config';
import { LabelModel } from './label.model';

@Component({
  selector: `${ config.components.prefix }-label }`,
  templateUrl: './label.component.html'
})
export class LabelComponent implements LabelModel, OnInit {
  static readonly defaultProps: LabelModel = {
    className: ''
  };

  @Input('className') classNameInput: string;

  public prefix = config.components.prefix;
  public className: string;

  ngOnInit() {
    const { defaultProps } = LabelComponent;

    this.className = this.classNameInput || defaultProps.className;
  }
}
