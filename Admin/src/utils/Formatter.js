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
};

export function LocationFormatter(input) {
  // Hilangkan karakter "/" jika ada
  let result = input.replace('/', '');
  
  // Ubah huruf pertama menjadi huruf besar
  result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  result = separateMyWords(result)
  console.log(result)
  return result;
}

export function separateMyWords(input) {
  // Gunakan ekspresi reguler untuk menemukan semua kata yang dimulai dengan 'My'
  const regex = /My[a-z]+/g;
  
  // Gantikan setiap kata yang cocok dengan kata yang dipisahkan
  const separatedString = input.replace(regex, match => {
    return match.replace('My', 'My ');
  });
  
  return separatedString;
}

  