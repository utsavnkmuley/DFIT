const passwordInput = document.getElementById('password');
const strengthMessage = document.getElementById('strength-message');
const suggestedPasswordElement = document.getElementById('suggested-password');
const suggestButton = document.getElementById('suggest-password');

function checkPasswordStrength(password) {
  let strength = 0;
  const consecutivePattern = /(.)\1/;
  const commonPatterns = /123456|password|qwerty|abc123/;

  if (password.length >= 8) {
    strength++;
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    strength++;
  }
  if (/\d/.test(password)) {
    strength++;
  }
  if (/[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?]/.test(password)) {
    strength++;
  }
  if (!consecutivePattern.test(password) && !commonPatterns.test(password)) {
    strength++;
  }

  let message = "";
  switch (strength) {
    case 0:
    case 1:
      message = "Weak Password";
      strengthMessage.className = 'weak';
      break;
    case 2:
    case 3:
      message = "Moderate Password";
      strengthMessage.className = 'moderate';
      break;
    case 4:
    case 5:
      message = "Strong Password";
      strengthMessage.className = 'strong';
      break;
  }

  strengthMessage.innerText = message;
}

function generateSuggestedPassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};':\\|,.<>/?";
  let suggestedPassword = "";
  
  // Ensure the suggested password includes at least one of each character type
  suggestedPassword += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
  suggestedPassword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
  suggestedPassword += "0123456789".charAt(Math.floor(Math.random() * 10));
  suggestedPassword += "!@#$%^&*()_+-=[]{};':\\|,.<>/?".charAt(Math.floor(Math.random() * 28));

  // Fill the rest of the password length with random characters
  for (let i = suggestedPassword.length; i < 12; i++) {
    suggestedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Shuffle the suggested password to avoid predictable patterns
  suggestedPassword = suggestedPassword.split('').sort(() => Math.random() - 0.5).join('');

  return suggestedPassword;
}

passwordInput.addEventListener('keyup', function() {
  const password = this.value;
  checkPasswordStrength(password);
});

suggestButton.addEventListener('click', function() {
  const suggestedPassword = generateSuggestedPassword();
  
  passwordInput.value = suggestedPassword; // Set suggested password as input value
  suggestedPasswordElement.innerText = "Suggested Password: " + suggestedPassword; // Display suggested password
});