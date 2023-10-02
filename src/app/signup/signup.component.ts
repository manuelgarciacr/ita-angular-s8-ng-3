import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { IUser } from 'src/model/IUser';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { checkPasswordValidator } from 'src/utils/CustomValidators';
import { UsersService } from 'src/services/users.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [NgIf, JsonPipe, ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styles: [
        '.close-btn svg { width: 1.4em; height: 1.4em}',
        ':host { min-height: 100vh; display: flex; flex-direction: column}',
    ],
})
export class SignupComponent implements OnInit {
    protected signUpForm: FormGroup = this.formBuilder.group({});
    private _user: IUser = { email: '' };
    @Input()
    set user(value: IUser) {
        this._user = value;
    }
    get user(): IUser {
        return this._user;
    }
    protected pwdState = {
        type: ['password', 'text'],
        svg: ['eye-slash', 'eye'],
        alt: [
            'The password text is not visible',
            'The password text is visible',
        ],
        state: 0,
    };
    protected tabindex = '-1';
    protected signUpError = true;
    @ViewChild('confirmation', { static: true }) confirmation:
        | ElementRef
        | undefined;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        const formGroup = {
            firstName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(5)],
            }),
            lastName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(5)],
            }),
            password: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    checkPasswordValidator(),
                ],
            }),
            mailing: new FormControl(false)
        };
        this.signUpForm = this.formBuilder.group(
            formGroup
        );
        this.signUpForm.reset();
        if (this.user.password != null)
            this.signUpForm.get('password')!.setValue(this.user.password);
        setTimeout(() => (this.tabindex = '0'), 500);
    }

    protected getError = (field: string) => {
        const errors = this.signUpForm.get(field)?.errors ?? {};
        const subject =
            field === 'firstName'
                ? 'The first name'
                : field === 'lastName'
                ? 'The last name'
                : 'The password';

        if (errors['required']) return subject + ' is mandatory.';
        if (errors['minlength'])
            return (
                subject +
                ` must be at lest ${errors['minlength'].requiredLength} characters.`
            );
        if (errors['checkPassword'])
            return (
                subject +
                ' The password must have at least one lowercase letter, one uppercase letter, one digit, and one special character.'
            );
        return subject + ' is not valid.';
    };

    closeSignup() {
        const modalRef = this.modalService.open(LoginComponent, {
            fullscreen: true,
            windowClass: 'login-modal',
        });
        modalRef.componentInstance.user = this.user;
        this.activeModal.close();
    }

    signUp() {
        const user = this.user;
        user.firstName = this.signUpForm.get('firstName')?.value;
        user.lastName = this.signUpForm.get('lastName')?.value;
        user.password = this.signUpForm.get('password')?.value;
        user.mailing = this.signUpForm.get('mailing')?.value;

        if (!user.mailing)
            user.mailing = false;

        this.usersService.signup(user).then((res) => {
            console.log(res);
            if (res == 'login') {
                this.signUpError = true;
            } else {
                this.signUpError = false;
            }
            this.modalService
                .open(this.confirmation)
                .result.then(
                    (result) => {console.log(result);},
                    (reason) => {console.log(reason);}
                );
            this.activeModal.close();
            return;
        });
    }

    togglePwdState() {
        this.pwdState.state = 1 - this.pwdState.state;
    }
}
