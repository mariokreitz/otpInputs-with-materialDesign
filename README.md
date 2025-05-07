# 🔐 Angular OTP Input Component

[![Angular](https://img.shields.io/badge/angular-v19-red.svg?logo=angular)](https://angular.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-StackBlitz-blue)](https://stackblitz.com/~/github.com/mariokreitz/otpInputs-with-materialDesign)

A lightweight, customizable OTP (One-Time Password) input component for Angular using Angular Material. Supports single-digit inputs, full-code pasting, error handling, and validation on submit.

---

## 🖼️ Screenshot

<img src="https://raw.githubusercontent.com/mariokreitz/otpInputs-with-materialDesign/refs/heads/main/public/preview.png" alt="OTP Input Demo" width="600">

---

## ✨ Features

- ✅ 7-digit OTP input with auto-focus
- ❌ Validation only on submit — detects empty, incomplete, or expired codes
- 🔁 Resend code button with 60s timer
- ❗ Full error state styling (invalid input, expired code, etc.)
- 📋 Paste support — auto-distributes OTP digits across all inputs
- 🧼 Errors reset when the user types or resends code
- 🎨 Fully customizable via Angular Material and SCSS

---

## 📦 Installation

```bash
git clone https://github.com/mariokreitz/angular-otp-input.git
cd angular-otp-input
````

Make sure Angular Material is installed:

```bash
ng add @angular/material
```

---

## 💻 Usage

### 1. Import and Use

```html
<app-otp-input></app-otp-input>
```

Make sure `OtpInputComponent` is either included in your module or used standalone.

---

## 📁 File Structure

```
otp-input/
├── otp-input.component.ts      # Core logic & validation
├── otp-input.component.html    # Angular Material form template
├── otp-input.component.scss    # Styles for layout and errors
```

---

## 🔧 Validation Logic

| Error Code    | Trigger                             |
| ------------- | ----------------------------------- |
| `codeMissing` | All fields are empty                |
| `codeUnknown` | At least one field is empty         |
| `codeExpired` | Simulated expired code from backend |

> Validation only runs on submit.

---

## ✍️ Customization

* 💡 **Change OTP length** in the `FormArray`
* 🎨 **Style inputs and error states** in `.scss`
* 🔗 **Paste behavior** auto-fills digit-by-digit

---

## 🔗 Live Demo

👉 [StackBlitz Demo](https://stackblitz.com/~/github.com/mariokreitz/otpInputs-with-materialDesign)

---

## 📄 License

MIT © \[Mario Kreitz]

---

## 🤝 Contributing

Got suggestions or improvements? Open a PR or issue!

---

```

Would you like me to create a real StackBlitz demo and upload the screenshot for you?
```
