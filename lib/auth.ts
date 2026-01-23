import { betterAuth } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import { PrismaClient } from "./generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { role } from "better-auth/plugins";
import { sendEmail } from "./email";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        async sendVerificationEmail({user, url}: {user: {email: string}, url: string}) {
            await sendEmail({
                to: user.email,
                subject: "Verify your password",
                text: `Click this link to verify your email:\n\n${url}`,
            });
        },
    },
    socialProviders:{
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false
            }
        }
    },
    plugins: [
        nextCookies()
    ]
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;