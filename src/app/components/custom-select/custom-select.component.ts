import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CustomSelect, CustomSelectOption } from './custom-select.model';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomSelectComponent)
  }],
  selector: 'custom-select',
  templateUrl: './custom-select.component.html'
})
export class CustomSelectComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomSelect = {
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: '',
    id: '',
    label: '',
    name: '',
    options: [],
    required: false,
    selectedOption: {} as CustomSelectOption,
    value: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomSelectOption>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public options: Array<CustomSelectOption>;
  public required: boolean;
  public selectedOption: CustomSelectOption;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSelectComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.id = this.idInput || defaultProps.id;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
    this.selectedOption = this.getInitOption(this.value, this.options);
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean): boolean {
    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  getInitOption(value: string, options: Array<CustomSelectOption>): CustomSelectOption {
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i];

      if (value === currentOption.value) {
        return currentOption;
      }
    }

    return {} as CustomSelectOption;
  }

  selectOption(event: any, selectedOption: CustomSelectOption) {
    event.stopImmediatePropagation();

    this.selectedOption = selectedOption;

    this.value = selectedOption
      ? selectedOption.value
      : '';

    this.closeMenu();

    this.isValid = this.validate(this.value, this.required);
  }

  openMenu() {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }

  closeMenu() {
    this.isTouched = true;
    this.isFocused = false;
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}
