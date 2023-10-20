export const GetDateTime = () => {
  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentDateTime.getDate()).padStart(2, "0");
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}~${hours}-${minutes}-${seconds}`;

  return formattedDateTime;
};

export const ConvertToDateMonth = (input) => {
  // Membuat objek Date dari tanggal asli
  const date = new Date(input);

  // Array nama bulan
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const day = date.getDate();
  const month = date.getMonth(); // Perhatikan bahwa ini dimulai dari 0 (Januari adalah bulan 0)
  const year = date.getFullYear();

  // Mengonversi bulan menjadi nama bulan
  const monthName = monthNames[month];

  // Membuat format tanggal yang diinginkan
  const formattedDate = `${day} ${monthName}`;

  console.log(formattedDate); // Output: "17 Okt"
  return formattedDate;
};

export function convertISODateToJSDate(isoDate) {
  const dateObject = new Date(isoDate);
  return dateObject;
}

export function DateFormatter(inputDate) {
  // Daftar nama bulan dalam bahasa Indonesia
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const tanggal = new Date(tanggalISO);
  const tanggalFormatted =
    tanggal.getDate() +
    " " +
    namaBulan[tanggal.getMonth()] +
    " " +
    tanggal.getFullYear();

  return tanggalFormatted;
}

export function LocationFormatter(input) {
  // Hilangkan karakter "/" jika ada
  let result = input.replace("/", "");

  // Ubah huruf pertama menjadi huruf besar
  result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  result = separateMyWords(result);
  console.log(result);
  return result;
}

export function separateMyWords(input) {
  // Gunakan ekspresi reguler untuk menemukan semua kata yang dimulai dengan 'My'
  const regex = /My[a-z]+/g;

  // Gantikan setiap kata yang cocok dengan kata yang dipisahkan
  const separatedString = input.replace(regex, (match) => {
    return match.replace("My", "My ");
  });

  return separatedString;
}
