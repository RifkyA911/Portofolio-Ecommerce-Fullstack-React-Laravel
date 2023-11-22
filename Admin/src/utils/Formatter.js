export function DateFormatter(type, inputDate) {
  // const inputDate = '2023-10-28T10:20:51.000000Z';

  // Mengonversi tanggal asli ke objek Date
  const date = inputDate ? new Date(inputDate) : new Date();

  if (type == null) {
    return date;
  } else if (type == "date") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else if (type == "dateTime") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else if (type == "dateTimeLocale") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } else if (type == "YYYY/MM/DD") {
    // Mendapatkan tanggal, bulan, dan tahun dari objek Date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tambahkan 1 karena bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, "0");

    // Membentuk tanggal dengan format 'YYYY/MM/DD'
    const formattedDate = `${year}/${month}/${day}`;

    // console.log(formattedDate);
    return formattedDate;
  } else if (type == "DD/MM") {
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

    // console.log(formattedDate); // Output: "17 Okt"
    return formattedDate;
  } else if (type == "YYYY-MM-DD-hh-mm-ss") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else if (type == "Day") {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August", // Mengganti "Augustus" dengan "August"
      "September",
      "October",
      "November",
      "December",
    ];

    const daysNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = daysNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${dayName}, ${monthName} ${day}, ${year} `;
  } else {
    console.error("Failed: Date Formatter conditions not matched");
  }
}

export function CurrencyFormatter(
  number,
  style = "currency",
  currency = "IDR"
) {
  // Format angka menjadi mata uang Rupiah
  return new Intl.NumberFormat("id-ID", {
    style: style,
    currency: currency,
  }).format(number);
}

export const SortData = (data, type, sortBy) => {
  if (!data) {
    console.error("Data is undefined or null");
    return { error: "Data is undefined or null", groupedData: {} };
  }

  if (type === "date") {
    const sortedData = [...data].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    const groupedData = sortedData.reduce((groups, data) => {
      const date = data.updated_at.split("T")[0]; // Mengambil bagian tanggal saja
      groups[date] = [...(groups[date] || []), data];
      return groups;
    }, {});

    // Mengembalikan objek dengan data yang diurutkan dan dikelompokkan
    return groupedData;
  } else {
    console.error("Invalid type: " + type);
    return { error: "Invalid type", groupedData: {} };
  }
};
