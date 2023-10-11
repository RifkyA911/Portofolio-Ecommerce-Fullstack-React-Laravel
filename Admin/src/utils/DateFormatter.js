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
  