/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { config } from '../../config';
import { Router } from '@angular/router';
import { supportedEvents } from '../../utils/get-supported-events.util';
import { SupportedEventsModel } from '../../components/common/models/supported-events.model';
import { TabComponent } from './tab/tab.component';
import { TabGroupModel } from './tab-group.model';

@Component({
  selector: `${ config.components.prefix }-tab-group }`,
  templateUrl: './tab-group.component.html'
})
export class TabGroupComponent implements AfterViewInit, OnChanges {
  static readonly defaultProps: TabGroupModel = {
    className: '',
    selectedIndex: 0,
    transitionDuration: 450
  };

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChild('indicator', { static: true }) indicatorRef: ElementRef;
  @ViewChild('header', { static: true }) headerRef: ElementRef;

  @Output('onSelectTab') onTabSelectEmitter: EventEmitter<number>;

  @Input() className: string = TabGroupComponent.defaultProps.className;
  @Input() selectedIndex: number = TabGroupComponent.defaultProps.selectedIndex;
  @Input() transitionDuration: number = TabGroupComponent.defaultProps.transitionDuration;

  public prefix = config.components.prefix;
  public supportedEvents: SupportedEventsModel;

  constructor(private router: Router, private renderer: Renderer2) {
    this.onTabSelectEmitter = new EventEmitter<number>();
    this.supportedEvents = supportedEvents();

    this.update = this.update.bind(this);

    window.addEventListener(this.supportedEvents.resize, this.update);
  }

  ngAfterViewInit() {
    setTimeout(this.update, 250);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedIndex && !changes.selectedIndex.isFirstChange()) {
      this.moveIndicator(changes.selectedIndex.currentValue, true);
    }
  }

  update() {
    this.moveIndicator(this.selectedIndex, false);
  }

  selectTab(index: number) {
    const tabs = this.tabs.toArray();
    const selectedTab = tabs[index];

    if (!selectedTab.disabled) {
      this.selectedIndex = index;

      this.onTabSelectEmitter.emit(index);
      this.moveIndicator(this.selectedIndex, true);

      if (selectedTab.link) {
        setTimeout(() => {
          this.router.navigate([selectedTab.link]);
        }, this.transitionDuration);
      }
    }
  }

  activateIndex(index: number) {
    this.tabs.forEach((tab, i) => {
      tab.isActive = i === index;
    });
  }

  moveIndicator(index: number, hasAnimation: boolean) {
    this.activateIndex(index);

    const child = this.headerRef.nativeElement.children[index];
    const transitionDuration = hasAnimation
      ? `${ this.transitionDuration }ms`
      : null;

    this.renderer.setStyle(this.indicatorRef.nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(this.indicatorRef.nativeElement, 'width', `${ child.offsetWidth }px`);
    this.renderer.setStyle(this.indicatorRef.nativeElement, 'transform', `translateX(${ child.offsetLeft }px)`);
  }
}
