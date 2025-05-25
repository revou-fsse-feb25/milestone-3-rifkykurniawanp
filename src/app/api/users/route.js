// Mock API route to fetch users for admin dashboard

export async function GET() {
  try {
    // In a real application, this would fetch from a database
    // For now, we'll use the same API as the auth route
    const response = await fetch("https://api.escuelajs.co/api/v1/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
