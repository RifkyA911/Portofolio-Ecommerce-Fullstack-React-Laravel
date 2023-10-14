// import jwt from 'jsonwebtoken';

// export function decodeJWT(getToken) {
    
//     const token = getToken; // Gantilah dengan token yang Anda terima dari server
//     const secretKey = import.meta.env.VITE_JWT_SECRET; // Gantilah dengan kunci rahasia (secret key) yang digunakan untuk menghasilkan token

//     try {
//         const decoded = jwt.verify(token, secretKey);
//         console.log(decoded);
//     // Di sini, 'decoded' akan berisi payload token JWT yang dapat Anda gunakan.
//     } catch (error) {
//         console.error("Error decoding JWT:", error);
//     }
// }