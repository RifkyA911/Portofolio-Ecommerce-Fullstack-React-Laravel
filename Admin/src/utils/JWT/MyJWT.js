import jwtDecode from "jwt-decode";

const secretKey = import.meta.env.VITE_JWT_SECRET; // Ganti dengan kunci rahasia Anda
function decodeJWT(token) {
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
    // console.log('token:', decodedToken);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return decodedToken;
}

// Fungsi untuk merefresh token
export const refreshAccessToken = async () => {
  try {
    // Ambil token refresh dari tempat penyimpanan yang sesuai (misalnya, cookie, local storage)
    const refreshToken = "your_refresh_token_here"; ////nunggu merdin

    // Lakukan permintaan POST ke endpoint refresh token di server Laravel
    const response = await fetch("https://your-laravel-api.com/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.access_token;

      // Simpan token akses yang baru ke tempat penyimpanan yang sesuai (misalnya, cookie, local storage)
      // Juga, gunakan token akses yang baru untuk permintaan selanjutnya
      return newAccessToken;
    } else {
      // Tangani kasus jika refresh token gagal (misalnya, refresh token tidak valid)
      // Anda mungkin ingin menghapus token penyimpanan dan/atau mengarahkan pengguna ke halaman login
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export default decodeJWT;
