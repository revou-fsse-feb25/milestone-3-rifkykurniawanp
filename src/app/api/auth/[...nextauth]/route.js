import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Sample user data (in a real app, you would use a database)
async function getUsers() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple email/password check against our mock data
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const users = await getUsers();
        const user = users.find((user) => user.email === credentials.email);

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          // Return user object without password
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        // If authentication fails
        return null;
      },
    }),
  ],
  callbacks: {
    // Add role to session
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    // Add role to token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret:
    process.env.NEXTAUTH_SECRET || "my-super-secret-key-that-should-be-in-env",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
