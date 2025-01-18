export async function fetchCategories(token: string | null): Promise<any[]> {
    if (!token) throw new Error("Authorization token is missing");

    const response = await fetch("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}
