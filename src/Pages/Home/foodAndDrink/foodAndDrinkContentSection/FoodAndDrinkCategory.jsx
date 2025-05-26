import { Grocery } from './Grocery';
import { Beverages } from './Beverages';
import { Confectionery } from './Confectionery';

export const categories = [
  {
    title: 'Grocery',
    color: 'bg-[#3DB54AF9]',
    image: '/images/grocery_sst.svg',
    link: '/shop/electronics',
    text: 'text-white',
  },
  {
    title: 'Confectionery',
    color: 'bg-[#F5F5F7]',
    image: '/images/confectionery_sst.svg',
    link: '/shop/food-drink',
    width: '250px',
  },
  {
    title: 'Beverages',
    color: 'bg-[#F5F5F7]',
    image: '/images/beverages.svg',
    link: '/shop/lifestyle',
  },
];

export const FoodAndDrinkCategory = () => {
  return (
    <section className=" pt-8">
      <h3 className="text-3xl font-semibold">Food & Drink</h3>
      <p className="mb-4">Shop by category</p>

      <div className="w-full  lg:flex lg:space-x-4 mb-4">
        <Grocery />
        <Confectionery />
        <Beverages />
      </div>
    </section>
  );
};
