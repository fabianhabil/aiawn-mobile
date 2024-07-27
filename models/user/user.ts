import { z } from 'zod';

export interface UserType {
    name: string;
    phoneNumber: string;
    id: string;
}

const phoneNumber = z
    .string()
    .min(1, { message: 'Phone Number Cant Be Empty' })
    .regex(/^\d+$/, {
        message: 'String must contain only numbers'
    })
    .min(9, { message: 'Phone Number Minimum 9 Digit' })
    .max(14, { message: 'Phone Number Maximum 14 Digit' });

const name = z
    .string()
    .min(1, { message: 'Name Cant Be Empty' })
    .max(64, { message: 'Maximum characters for Name is 64' });

export const checkUserValidation = z.object({
    phoneNumber
});

export type CheckUserValidationType = z.infer<typeof checkUserValidation>;

export const registerUserValidation = z.object({
    phoneNumber,
    name
});

export type RegisterUserValidationType = z.infer<typeof registerUserValidation>;

export namespace UserRequest {
    export namespace Request {
        export interface Check extends CheckUserValidationType {}
        export interface Register extends RegisterUserValidationType {}
    }

    export namespace Response {
        export interface Check {
            data: {
                name: string;
                phone: string;
                _id: string;
            };
        }

        export interface Register {
            data: {
                name: string;
                phone: string;
                _id: string;
            };
        }
    }
}
