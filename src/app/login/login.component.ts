import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./login.component.html",
    styles: [
        ".close-btn svg { width: 1.4em; height: 1.4em}",
        ":host { min-height: 100vh; display: flex; flex-direction: column}",
    ],
})
export class LoginComponent implements OnInit {
    protected loginForm: FormGroup = this.formBuilder.group({});

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        const formGroup = {
            email: new FormControl("", {
                validators: [Validators.required, Validators.email],
                // asyncValidators: [
                //     this.budgetExistsValidator.validate.bind(
                //         this.budgetExistsValidator
                //     ),
                // ],
            }),
        };
        this.loginForm = this.formBuilder.group(
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

        this.loginForm.reset();
    }

    protected getError = (field: string) => {
        const errors = this.loginForm.get(field)?.errors ?? {};
        const subject = "El email";
            /* field === "name"
                ? "El nombre del presupuesto"
                : field === "customer"
                ? "El nombre del cliente"
                : "La fecha del presupuesto"; */

        //if (field == "date") return subject + " es obligatoria.";
        if (errors["required"]) return subject + " es obligatorio.";
        // if (errors["minlength"])
        //     return (
        //         subject +
        //         ` debe tener al menos ${errors["minlength"].requiredLength} caracteres.`
        //     );
        // if (errors["budgetExists"]) return subject + " ya existe.";
        return subject + " no es válido.";
    };

    login() {
        alert("OK")
    }
}
