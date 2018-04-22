export interface Roles {
    vendor: boolean;
    admin?: boolean;
    web?: boolean;
}

export class User {
    email: string;
    sku: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.sku = '*';
        this.roles = {vendor: true};
    }
}