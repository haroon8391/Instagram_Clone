import NextAuth from "next-auth"
import GOOGLEProvider from "next-auth/providers/GOOGLE"
const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GOOGLEProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecId: process.env.GOOGLE_SECRET,
        }),
    ],
})


export { handler as GET, handler as POST }