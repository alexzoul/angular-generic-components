import { FormField } from '../custom-form/custom-form.model';

export interface CustomRadio extends FormField {
  canUncheck: boolean;
  errorMessage: string;
  iconName: string;
  options: Array<CustomRadioOption>;
  value: string;
}

export interface CustomRadioOption {
  content: string;
  value: string;
}
