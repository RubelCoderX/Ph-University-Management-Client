export const monthNames = [
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

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genders = ["male", "female", "other"];
export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
  value: item,
  label: item,
}));
export const bloodGroupOptions = bloodGroup.map((item) => ({
  value: item,
  label: item,
}));
