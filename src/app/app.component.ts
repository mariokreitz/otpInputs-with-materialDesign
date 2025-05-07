import { Component } from '@angular/core';
import { OtpInputComponent } from './otp-input/otp-input.component';

@Component({
  selector: 'app-root',
  imports: [OtpInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'otpInputs-with-materialDesign';
}
