export const getLocationString = (value: string) => {
  switch (value) {
    case "1":
      return "Nakuru";
    case "2":
      return "Nairobi";
    case "3":
      return "Kiambu";
    case "4":
      return "Mombasa";
    case "5":
      return "Eldoret";
    default:
      return "Unknown";
  }
};
export const getTypeString = (value: number) => {
  switch (value) {
    case 1:
      return "Commercial";
    case 2:
      return "Houses";
    case 3:
      return "Apartments";

    default:
      return "Unknown";
  }
};
export const getFeatures = (value: number) => {
  switch (value) {
    case 1:
      return "Swimming pool";
    case 2:
      return "Parking";
    case 3:
      return "Gym";
    case 4:
      return "Garden";
    case 5:
      return "Balcony";

    default:
      return "Unknown";
  }
};
