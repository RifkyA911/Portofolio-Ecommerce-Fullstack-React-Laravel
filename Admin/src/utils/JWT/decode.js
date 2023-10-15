import jwtDecode from "jwt-decode";

const secretKey = import.meta.env.VITE_JWT_SECRET; // Ganti dengan kunci rahasia Anda
function decodeJWT (token) {
    let decodedToken
    try {
    decodedToken = jwtDecode(token);
    // console.log('token:', decodedToken);
    } catch (error) {
    console.error("Error decoding token:", error);
    }
  return decodedToken
};
export default decodeJWT