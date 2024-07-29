import NextAuth from "next-auth"
import GOOGLEProvider from "next-auth/providers/GOOGLE"
const handler = NextAuth({
    providers: [
        GOOGLEProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],

    callbacks: {
        async session({ session, token }) {
            session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
})


export { handler as GET, handler as POST }