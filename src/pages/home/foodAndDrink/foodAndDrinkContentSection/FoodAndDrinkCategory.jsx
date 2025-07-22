import { Grocery } from './Grocery';
import { Beverages } from './Beverages';
import { Confectionery } from './Confectionery';

export const shopByFoodAndDrinksCategories = [
  {
    title: 'Grocery',
    color: 'bg-[#3DB54AF9]',
    image: '/images/grocery_sst.svg',
    link: '/food-drink/grocery',
    text: 'text-white',
  },
  {
    title: 'Confectionery',
    color: 'bg-[#F5F5F7]',
    image: '/images/confectionery_sst.svg',
    link: '/food-drink/confectionery',
    width: '250px',
  },
  {
    title: 'Beverages',
    color: 'bg-[#F5F5F7]',
    image: '/images/beverages.svg',
    link: '/food-drink/beverages',
  },
];

export const FoodAndDrinkCategory = () => {
  return (
    <section className="lg:mx-5 pt-8">
      <h3 className="text-3xl font-semibold mx-5">Food & Drink</h3>
      <p className="mb-4 mx-5 font-outfit">Shop by category</p>

      <div className="w-full lg:flex lg:space-x-4 mb-4 grid gap-8 lg:gap-4 ">
        <Grocery />
        <Confectionery />
        <Beverages />
      </div>
    </section>
  );
};
