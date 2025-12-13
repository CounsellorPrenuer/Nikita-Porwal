export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  packages: Package[];
}

export const pricingCategories: Category[] = [
  {
    id: "8-9",
    name: "8-9 Students",
    packages: [
      {
        id: "8-9-discover",
        name: "Discover",
        price: 5500,
        description: "Perfect for students starting their educational journey",
      },
      {
        id: "8-9-discover-plus",
        name: "Discover Plus+",
        price: 15000,
        description: "Comprehensive guidance for serious learners",
      },
    ],
  },
  {
    id: "10-12",
    name: "10-12 Students",
    packages: [
      {
        id: "10-12-achieve",
        name: "Achieve Online",
        price: 5999,
        description: "Stream selection and career pathway guidance",
      },
      {
        id: "10-12-achieve-plus",
        name: "Achieve Plus+",
        price: 10599,
        description: "Complete guidance for board exam students",
      },
    ],
  },
  {
    id: "college",
    name: "College Graduates",
    packages: [
      {
        id: "college-ascend",
        name: "Ascend Online",
        price: 6499,
        description: "Launch your career with expert guidance",
      },
      {
        id: "college-ascend-plus",
        name: "Ascend Plus+",
        price: 10599,
        description: "Comprehensive career launch program",
      },
    ],
  },
  {
    id: "working",
    name: "Working Professionals",
    packages: [
      {
        id: "working-ascend",
        name: "Ascend Online",
        price: 6499,
        description: "Navigate your career transition successfully",
      },
      {
        id: "working-ascend-plus",
        name: "Ascend Plus+",
        price: 10599,
        description: "Complete career transformation program",
      },
    ],
  },
];

export function getPackageById(packageId: string): Package | undefined {
  for (const category of pricingCategories) {
    const pkg = category.packages.find((p) => p.id === packageId);
    if (pkg) return pkg;
  }
  return undefined;
}

export function getCategoryById(categoryId: string): Category | undefined {
  return pricingCategories.find((c) => c.id === categoryId);
}
