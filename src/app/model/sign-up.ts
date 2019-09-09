import { User } from './user';

import { UserCredential } from './user-credential';

export class SignUp {
    user: User;
    userCredential: UserCredential;
    constructor(){
        this.user = new User();
        this.userCredential = new UserCredential();
    }
}
