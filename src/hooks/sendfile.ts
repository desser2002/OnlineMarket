import { useState } from "react";

export const useProduct = (token: string, username: string) => {
    const [isLoading, setIsLoading] = useState(false);

    // Загрузка файла
    const uploadFile = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("http://localhost:8080/api/products/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("File uploaded successfully. File URI:", data.fileUri);
                return data.fileUri; // Возвращаем путь к загруженному файлу
            } else {
                console.error("File upload failed:", response.statusText);
                const error = await response.text();
                console.error("Server response:", error);
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    };

    // Создание продукта с категорией
    const createProduct = async (product: {
        name: string;
        price: number;
        description?: string;
        imageUrl: string;
        categoryId: number; // Added categoryId here
    }) => {
        try {
            const response = await fetch("http://localhost:8080/api/products/new", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: product.name,
                    price: parseFloat(product.price.toString()), // Убедимся, что price отправляется как Double
                    username: username,
                    description: product.description || "",
                    imageUrl: product.imageUrl, // Передаем только имя файла
                    categoryId: product.categoryId, // Pass categoryId here
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Product created successfully:", data);
                return data; // Возвращаем данные нового продукта
            } else {
                const error = await response.text();
                console.error("Failed to create product. Server response:", error);
                return null;
            }
        } catch (error) {
            console.error("Error creating product:", error);
            return null;
        }
    };

    // Основной метод для загрузки файла и создания продукта
    const saveProductWithImage = async (
        file: File | null,
        product: { name: string; price: number; description?: string; categoryId: number } // categoryId added here
    ) => {
        setIsLoading(true); // Включаем индикатор загрузки
        try {
            let filePath: string | null = null;

            // Загружаем файл, если он предоставлен
            if (file) {
                filePath = await uploadFile(file);
                if (!filePath) throw new Error("Failed to upload file");
            }

            // Убедимся, что URL файла есть перед созданием продукта
            const imageUrl = filePath?.split('/').pop() || ""; // Сохраняем только имя файла

            const newProduct = await createProduct({ ...product, imageUrl });

            if (!newProduct) {
                console.error("Failed to save product");
            } else {
                console.log("Product saved successfully:", newProduct);
            }

            return newProduct;
        } catch (error) {
            console.error("Error saving product with image:", error);
            return null;
        } finally {
            setIsLoading(false); // Выключаем индикатор загрузки
        }
    };

    return { saveProductWithImage, isLoading };
};
