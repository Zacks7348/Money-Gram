import { atom } from 'recoil';

export const userNameState = atom({
    key: 'userNameState',
    default: '',
});

export const passwordState = atom({
    key: 'passwordState',
    default: '',
});

export const errorsState = atom({
    key: 'errorsState',
    default: '',
});

export const authState = atom({
    key: 'authState',
    default: true,
});

export const loginAttemptState = atom({
    key: 'loginAttemptState',
    default: 0,
});

export const activeTabState = atom({
    key: 'activeTabState',
    default: 'public',
});

export const responseUserNameState = atom({
    key: 'responseUserNameState',
    default: '',
});

export const responseUserIDState = atom({
    key: 'responseUserIDState',
    default: '',
});

export const phoneNumberState = atom({
    key: 'phoneNumberState',
    default: ' ',
});


export const signupFirstNameState = atom({
    key: 'signupFirstNameState',
    default: '',
})

export const signupLastNameState = atom({
    key: 'signupLastNameState',
    default: '',
})

export const signupMiddleNameState = atom({
    key: 'signupMiddleNameState',
    default: '',
})

export const signupDOBState = atom({
    key: 'signupDOBState',
    default: '',
})

export const signupPhoneNumberState = atom({
    key: 'signupPhoneNumberState',
    default: '',
})

export const signupEmailState = atom({
    key: 'signupEmailState',
    default: '',
})

export const signupUserNameState = atom({
    key: 'signupUserNameState',
    default: '',
})

export const signupPasswordState = atom({
    key: 'signupPasswordState',
    default: '',
})

export const signupVerifyPasswordState = atom({
    key: 'signupVerifyPasswordState',
    default: '',
})

export const cardState = atom({
    key: 'cardState',
    default: {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    }
});

