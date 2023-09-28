import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { IUser } from 'src/model/IUser';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: "app-signup",
    standalone: true,
    imports: [NgIf, JsonPipe, ReactiveFormsModule],
    templateUrl: "./signup.component.html",
    styles: [
        ".close-btn svg { width: 1.4em; height: 1.4em}",
        ":host { min-height: 100vh; display: flex; flex-direction: column}",
    ],
})
export class SignupComponent implements OnInit {
    @Input() protected user: IUser = { email: "" };
    protected signUpForm: FormGroup = this.formBuilder.group({});

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit(): void {
        const formGroup = {
            firstName: new FormControl("", {
                validators: [Validators.required],
                // asyncValidators: [
                //     this.budgetExistsValidator.validate.bind(
                //         this.budgetExistsValidator
                //     ),
                // ],
            }),
        };
        this.signUpForm = this.formBuilder.group(
            formGroup /* , {
            validators: (control: AbstractControl) => {
                const website = control.get("website")?.value;
                const pages = control.get("pages")?.value;
                const languages = control.get("languages")?.value;
                if (!website) return null;
                if (pages > 0 && languages > 0) return null;
                return { detail: true };
            },
        } */
        );
    }

    protected getError = (field: string) => {
        const errors = this.signUpForm.get(field)?.errors ?? {};
        const subject = "The first name";
        /* field === "name"
                ? "El nombre del presupuesto"
                : field === "customer"
                ? "El nombre del cliente"
                : "La fecha del presupuesto"; */

        //if (field == "date") return subject + " es obligatoria.";
        if (errors["required"]) return subject + " is mandatory.";
        // if (errors["minlength"])
        //     return (
        //         subject +
        //         ` debe tener al menos ${errors["minlength"].requiredLength} caracteres.`
        //     );
        // if (errors["budgetExists"]) return subject + " ya existe.";
        return subject + " is not valid.";
    };

    closeSignup() {
        console.log("CLOSE SIGNUP")
    }

    signUp() {
        alert("SIGNUP");
    }
}
