import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: "Usuario requerido",
    }),
    email: z
        .string ({
            required_error: "Email es requerido"
        })
        .email ({
            message: "Email incorrecto"
        }),
    password: z
        .string({
        required_error: "Contraseña requerida",
        })
        .min(6, { 
            message: "Contraseña debe tener minimo 6 caracteres"
        })
})

export const loginSchema = z.object({
    email: z
        .string ({
            required_error: "Email es requerido",
        })
        .email ({
            message: "Email incorrecto"
        }),
    password: z
        .string ({
            required_error: "Contraseña requerida",
        })
        .min(6, { 
            message: "Contraseña debe tener minimo 6 caracteres"
        })
})