export const initialData = [
  {
    id: 1,
    label: "Electronics",
    value: 1500,
    defaultValue: 1500,
    children: [
      { id: 2, label: "Phones", value: 800, defaultValue: 800, parent: 1 },
      { id: 3, label: "Laptops", value: 700, defaultValue: 700, parent: 1 },
    ],
  },
  {
    id: 4,
    label: "Furniture",
    value: 1000,
    defaultValue: 1000,
    children: [
      { id: 5, label: "Tables", value: 300, defaultValue: 300, parent: 4 },
      { id: 6, label: "Chairs", value: 700, defaultValue: 700, parent: 4 },
    ],
  },
];
