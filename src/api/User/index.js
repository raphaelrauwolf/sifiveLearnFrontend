
import { getUser } from './get';
import { getUserProgress } from './getProgress';
import { login } from './login';
import { getCurrentUser } from './me';
import { signup } from './signup';
import { verifyEmail } from './verifyEmail';
import { resetPassword } from './resetPassword';
import { checkPasswordResetCode } from './checkResetCode';
import { updatePassword } from './updatePassword';

export default {
    getUser,
    getUserProgress,
    login,
    getCurrentUser,
    signup,
    verifyEmail,
    resetPassword,
    checkPasswordResetCode,
    updatePassword,
};
