import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignupComponent } from "../signup/signup.component";
import { IUser } from "src/model/IUser";
import { UsersService } from "src/services/users.service";
import { checkPasswordValidator } from "src/utils/CustomValidators";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styles: [
        '.close-btn svg { width: 1.4em; height: 1.4em}',
        ':host { min-height: 100vh; display: flex; flex-direction: column}',
        `
            input:-webkit-autofill,
            input:-webkit-autofill:focus {
                transition: background-color 0s 600000s, color 0s 600000s;
            }
        `, // Browser color bug with internal-autofill-selected
    ],
})
export class LoginComponent implements OnInit {
    protected loginForm: FormGroup = this.formBuilder.group({});
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
    @ViewChild('confirmation', { static: true }) confirmationRef:
        | ElementRef
        | undefined;
    @ViewChild('error', { static: true }) errorRef:
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
            email: new FormControl('', {
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl('', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    checkPasswordValidator(),
                ],
            }),
        };
        this.loginForm = this.formBuilder.group(
            formGroup
        );

        this.loginForm.reset();

        if (this.user.email != null)
            this.loginForm.get('email')!.setValue(this.user.email);
        if (this.user.password != null)
            this.loginForm.get('password')!.setValue(this.user.password);
    }

    protected getError = (field: string) => {
        const errors = this.loginForm.get(field)?.errors ?? {};
        const subject = field === 'email' ? 'The email' : 'The password';

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

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;

        this.usersService.login(email, password).then((res) => {
            if (res == 'signup') {
                this.signUpConfirmation();
                return;
            } else if (!res){
                this.showError()
            }
            this.activeModal.close();
        });
    }

    signUpConfirmation(){
        this.modalService.open(this.confirmationRef).result.then(
            (result) => {
                if (result == 'signup') {
                    this.signUp();
                }
            },
            (reason) => {
                console.log(reason);
            }
        );
    }

    signUp() {
        const modalRef = this.modalService.open(SignupComponent, {
            fullscreen: true,
            windowClass: 'login-modal',
        });
        this.user.email = this.loginForm.get('email')?.value;
        this.user.password = this.loginForm.get('password')?.value;
        modalRef.componentInstance.user = this.user;
        this.activeModal.close();
    }

    showError() {
        this.modalService.open(this.errorRef).result.then(
            (result) => {
                console.log(result);
            },
            (reason) => {
                console.log(reason);
            }
        );
    }

    togglePwdState() {
        this.pwdState.state = 1 - this.pwdState.state;
    }
}
