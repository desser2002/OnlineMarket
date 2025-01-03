/** @type {import('next').NextConfig} */
export default {
    async redirects() {
        return [
            {
                source: '/', // Корневой URL
                destination: '/login', // Стартовая страница
                permanent: false, // Временный редирект
            },
        ];
    },
};