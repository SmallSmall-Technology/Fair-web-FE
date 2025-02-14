const menshirt = "/images/mens-shirt.svg";
const womenshirt = "/images/womens-dress.svg";
const groceries = "/images/grocery-basket.svg";
const homeoffice = "/images/sofa.svg";
const computers = "/images/computer.svg";
const power = "/images/power-generator.svg";
const electronics = "/images/electronics.svg";
const phones = "/images/mobile-phone.svg";
const kids = "/images/teddy-bear.svg";
const sports = "/images/sport-items.svg";
const healthbeauty = "/images/health-beauty.svg";
const mobileaccessories = "/images/mobile-accessories.svg";
const toysgames = "/images/toys-games.svg";

const valentineAd = "/images/large-fair-web-banner.svg";
const preciousGift = "/images/precious-gift.png";
const loveFair = "/images/love-fair.png";
const shoppingCart = "/images/shopping-bag.svg";

const girInHoodie = "/images/young-woman-in-hoodie.svg";

export const productCategories = [
  {
    id: 1,
    productName: "Men",
    productIcon: menshirt,
  },
  {
    id: 2,
    productName: "Women",
    productIcon: womenshirt,
  },
  {
    id: 3,
    productName: "Groceries",
    productIcon: groceries,
  },
  {
    id: 4,
    productName: "Home & Office",
    productIcon: homeoffice,
  },
  {
    id: 5,
    productName: "Computers",
    productIcon: computers,
  },
  {
    id: 6,
    productName: "Power",
    productIcon: power,
  },
  {
    id: 7,
    productName: "Electronics",
    productIcon: electronics,
  },
  {
    id: 8,
    productName: "Phones",
    productIcon: phones,
  },
  {
    id: 9,
    productName: "Kids",
    productIcon: kids,
  },
  {
    id: 10,
    productName: "Sports Items",
    productIcon: sports,
  },
  {
    id: 11,
    productName: "Health & Beauty",
    productIcon: healthbeauty,
  },
  {
    id: 12,
    productName: "Mobile Accessories",
    productIcon: mobileaccessories,
  },
  {
    id: 13,
    productName: "Toys & Games",
    productIcon: toysgames,
  },
];

export const productAds = [
  {
    id: 1,
    name: "Valentine's Special",
    image: valentineAd,
  },
  {
    id: 2,
    name: "Valentine's Special",
    image: preciousGift,
  },
  {
    id: 3,
    name: "Valentine's Special",
    image: valentineAd,
  },
];

export const heroCards = [
  {
    id: 1,
    image: loveFair,
    alt: "An Image of a lady sitting on the sofa while wearing hoodie",
  },
  {
    id: 2,
    image: girInHoodie,
    alt: "An Image of a lady sitting on the sofa while wearing hoodie",
    text: "Shop the latest",
    textDetails: "Electronics, fashion, home essentials, grocery all here.",
    shoppingCart: shoppingCart,
  },
  {
    id: 3,
    image: preciousGift,
    alt: "An Image of a lady sitting on the sofa while wearing hoodie",
  },
];

// export const products = [
//   {
//     id: 1,
//     name: "Samsung Galaxy Note 10 Plus 256gb/12gb Single Sim - Purple",
//     image: "/images/iPhone.svg",
//     price: "N207,000.00",
//     discountPrice: "N225,000.00",
//     ratings: "3.5",
//     noOfProductSold: "20",
//   },

//   {
//     id: 2,
//     name: "Wireless Headphones",
//     image: "/images/iPhone.svg",
//     price: "N207,000.00",
//     discountPrice: "N225,000.00",
//     ratings: "3.5",
//     noOfProductSold: "20",
//   },
// ];
export const products = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name:
    index % 2 === 0
      ? "Samsung Galaxy Note 10 Plus 256gb/12gb Single Sim - Purple"
      : "Television ",
  image: index % 2 === 0 ? "/images/iPhone.svg" : "/images/television.svg",
  price: "N207,000.00",
  discountPrice: "N225,000.00",
  ratings: "3.5",
  noOfProductSold: "20",
}));

export const popularProducts = [
  {
    id: 1,
    image: "/images/computers&tablets.svg",
    name: "TV, Cell phone, Laptops",
    category: "Electronics",
    link: "href/electronics",
  },
  {
    id: 2,
    image: "/images/makeup-kits.svg",
    name: "Makeup,  hair, body lotion  ",
    category: "Health&Beauty",
    link: "href/home/health",
  },
  {
    id: 3,
    image: "/images/flower-basket.svg",
    name: "Rice, Yam, Chicken",
    category: "Groceries",
    link: "href/home/groceries",
  },
];
