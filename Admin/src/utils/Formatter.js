export function DateFormatter(type, inputDate) {
  // const inputDate = '2023-10-28T10:20:51.000000Z';

  // Mengonversi tanggal asli ke objek Date
  const date = inputDate ? new Date(inputDate) : new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
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

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (type == null) {
    return date;
  } else if (type == "date") {
    return `${year}-${month}-${day}`;
  } else if (type == "dateTime") {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else if (type == "dateTimeLocale") {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } else if (type == "YYYY/MM/DD") {
    return `${year}/${month}/${day}`;
  } else if (type == "DD/MM") {
    return `${day} ${monthName}`;
  } else if (type == "YYYY-MM-DD-hh-mm-ss") {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } else if (type == "Day") {
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
