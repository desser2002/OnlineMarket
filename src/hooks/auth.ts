// api/auth.ts

export async function login(username: string, password: string): Promise<{
    userId: string;
    token: string;
    role: string; // Добавлено поле для роли
}> {
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
    return {
        userId: data.userId,
        token: data.token,
        role: data.role, // Получаем роль пользователя из ответа
    };
}



export async function registerUser(username: string, password: string, isSeller: boolean): Promise<void> {
    const role = isSeller ? "SELLER" : "USER";

    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }
}
