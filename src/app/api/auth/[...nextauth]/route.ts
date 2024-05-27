import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				login: {},
				password: {}
			},
			async authorize(credentials, req) {
				const res = await fetch('http://127.0.0.1:8000/api/login', {
					method: 'POST',
					body: JSON.stringify({
						login: credentials?.login,
						password: credentials?.password
					}),
					headers: { 'Content-Type': 'application/json' }
				})

				const result = await res.json()
				const user = { ...result.user, token: result.access_token }

				// const data = { token: result.access_token, user: result.user }

				if (result.status) {
					return user
				} else {
					throw new Error(
						JSON.stringify({ errors: result.message, status: false })
					)
				}
			}
		})
	],
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update') {
				return { ...token, ...session.user }
			}
			return { ...token, ...user }
		},
		async session({ session, token, user }) {
			session.user = token
			return session
		}
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60
	}
})

export { handler as GET, handler as POST }
