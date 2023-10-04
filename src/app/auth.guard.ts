import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

export const authGuard: CanActivateFn = () => {
    const usersService = inject(UsersService);
    const router = inject(Router);

    if (usersService.isLoggedIn()) {
        return true;
    }
    return router.parseUrl('/home');
};
