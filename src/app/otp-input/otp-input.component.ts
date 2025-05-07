import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-otp-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
})
export class OtpInputComponent implements OnInit {
  @ViewChildren('inputEl') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpForm = new FormGroup({
    code: new FormArray(
      Array(7)
        .fill('')
        .map(() => new FormControl(''))
    ),
  });

  submitted = false;
  timeLeft = 60;
  private expirationTs!: number;
  private resendInterval!: any;

  get codeControls() {
    return (this.otpForm.get('code') as FormArray).controls;
  }

  ngOnInit() {
    this.resetExpiration();
    this.startResendTimer();
  }

  async onSubmit() {
    this.submitted = true;
    this.clearAllErrors();

    const values = this.codeControls.map((c) => c.value).join('');
    const allEmpty = values.trim().length === 0;
    const anyEmpty = values.length < this.codeControls.length;

    if (allEmpty) {
      this.otpForm.setErrors({ codeMissing: true });
      this.markChildrenInvalid();
      return;
    }
    if (anyEmpty) {
      this.otpForm.setErrors({ codeUnknown: true });
      this.markChildrenInvalid();
      return;
    }

    try {
      await this.fakeValidateCode(values);
      console.log('Valid code:', values);
    } catch {
      this.otpForm.setErrors({ codeExpired: true });
      this.markChildrenInvalid();
    }
  }

  onInput(e: Event, i: number) {
    const input = e.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '');
    input.value = digit;
    this.codeControls[i].setValue(digit, { emitEvent: false });

    this.clearAllErrors();

    if (digit && i < this.codeControls.length - 1) {
      this.inputs.toArray()[i + 1].nativeElement.focus();
    }
  }

  onBackspace(e: KeyboardEvent, i: number) {
    if (
      e.key === 'Backspace' &&
      !(e.target as HTMLInputElement).value &&
      i > 0
    ) {
      this.inputs.toArray()[i - 1].nativeElement.focus();
    }
  }

  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') || '';
    const digits = text.replace(/\D/g, '').slice(0, this.codeControls.length);

    this.codeControls.forEach((ctrl, idx) => {
      ctrl.setValue(digits[idx] || '', { emitEvent: false });
    });

    this.clearAllErrors();

    const lastIdx = digits.length ? digits.length - 1 : 0;
    setTimeout(() => {
      this.inputs.toArray()[lastIdx]?.nativeElement.focus();
    });
  }

  resendCode() {
    this.resetExpiration();
    this.startResendTimer();
    this.otpForm.reset();
    this.submitted = false;
    this.clearAllErrors();
    setTimeout(() => this.inputs.first?.nativeElement.focus());
  }

  private clearAllErrors() {
    this.otpForm.setErrors(null);
    this.codeControls.forEach((c) => c.setErrors(null, { emitEvent: false }));
  }

  private markChildrenInvalid() {
    this.codeControls.forEach((ctrl) =>
      ctrl.setErrors({ formError: true }, { emitEvent: false })
    );
  }

  private fakeValidateCode(code: string): Promise<void> {
    return new Promise((res, rej) =>
      setTimeout(() => (code === '1234567' ? res() : rej()), 500)
    );
  }

  private resetExpiration() {
    this.expirationTs = Date.now() + 5 * 60e3;
  }

  private startResendTimer() {
    clearInterval(this.resendInterval);
    this.timeLeft = 60;
    this.resendInterval = setInterval(() => {
      if (--this.timeLeft <= 0) clearInterval(this.resendInterval);
    }, 1000);
  }
}
