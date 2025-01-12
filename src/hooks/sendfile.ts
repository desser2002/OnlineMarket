export const useFileUpload = (token: string) => {
    const handleFileUpload = async (file: File): Promise<string | null> => {
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
                console.log("File uploaded successfully:", data.filePath);
                return data.filePath;
            } else {
                console.error("File upload failed:", response.statusText);
                alert("File upload failed");
                return null;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file");
            return null;
        }
    };

    return { handleFileUpload };
};
