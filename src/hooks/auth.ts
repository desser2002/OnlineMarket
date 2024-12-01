// api/auth.ts

export async function login(username: string, password: string): Promise<{ token: string }> {
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to log in. Check your credentials.');
    }

    const data = await response.json();
    return data; // Возвращает токен
}

// api/auth.ts



export async function registerUser(username: string, password: string): Promise<void> {
    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }
}
