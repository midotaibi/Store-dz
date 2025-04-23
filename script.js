document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // وظيفة تبديل رؤية كلمة المرور
    window.togglePasswordVisibility = function() {
        const passwordField = document.getElementById('password');
        const toggleIcon = document.querySelector('.toggle-password i');
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    };

    // وظيفة فحص قوة كلمة المرور (بسيطة)
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;

        let strengthText = '';
        let strengthColor = '#ccc';

        switch (strength) {
            case 0:
            case 1:
                strengthText = 'ضعيفة';
                strengthColor = '#ff4d4d';
                break;
            case 2:
                strengthText = 'متوسطة';
                strengthColor = '#ffa500';
                break;
            case 3:
            case 4:
                strengthText = 'قوية';
                strengthColor = '#4caf50';
                break;
        }

        passwordStrength.textContent = strengthText ? `قوة كلمة المرور: ${strengthText}` : '';
        passwordStrength.style.color = strengthColor;
    });

    // وظيفة التحقق من صحة النموذج (مثال بسيط)
    loginForm.addEventListener('submit', (e) => {
        let isValid = true;

        // التحقق من اسم المستخدم/البريد الإلكتروني
        if (!usernameInput.value.trim()) {
            displayError(usernameError, 'اسم المستخدم أو البريد الإلكتروني مطلوب.');
            isValid = false;
        } else {
            clearError(usernameError);
        }

        // التحقق من كلمة المرور
        if (!passwordInput.value) {
            displayError(passwordError, 'كلمة المرور مطلوبة.');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        if (!isValid) {
            e.preventDefault(); // منع الإرسال إذا كان النموذج غير صالح
        } else {
            alert('تم تسجيل الدخول بنجاح! (هذا مجرد مثال)');
            // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
        }
    });

    function displayError(element, message) {
        element.textContent = message;
    }

    function clearError(element) {
        element.textContent = '';
    }
});
