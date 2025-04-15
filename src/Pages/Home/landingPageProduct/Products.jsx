import { Beauty } from './Beauty';
import { useRef, useState } from 'react';
import { TodaysDeal } from './TodaysDeal';
import { Electronics } from './Electronics';
import { NewProductsInStore } from './NewProductsInStore';
import { PopularProducts } from './popularProducts/PopularProducts';

const Products = () => {
  const [newProductsScroll, setNewProductsScroll] = useState(0);
  const [todaysDealScroll, setTodaysDealScroll] = useState(0);
  const [electronicsScroll, setElectronicsScroll] = useState(0);
  const [beautyScroll, setBeautyScroll] = useState(0);

  const newProductsRef = useRef(null);
  const todaysDealRef = useRef(null);
  const electronicsRef = useRef(null);
  const beautyRef = useRef(null);

  const item_width = 136;

  const handleScroll = (ref, setScroll, scrollAmount) => {
    const newScrollPosition = ref.current.scrollLeft + scrollAmount;
    setScroll(newScrollPosition);
    ref.current.scrollLeft = newScrollPosition;
  };

  return (
    <section className="mx-6 md:mx-[76px]">
      <NewProductsInStore
        onScrollProduct={(scrollAmount) =>
          handleScroll(newProductsRef, setNewProductsScroll, scrollAmount)
        }
        item_width={item_width}
        containerRef={newProductsRef}
      />
      <PopularProducts />
      <TodaysDeal
        onScrollProduct={(scrollAmount) =>
          handleScroll(todaysDealRef, setTodaysDealScroll, scrollAmount)
        }
        item_width={item_width}
        containerRef={todaysDealRef}
      />
      <Electronics
        onScrollProduct={(scrollAmount) =>
          handleScroll(electronicsRef, setElectronicsScroll, scrollAmount)
        }
        item_width={item_width}
        containerRef={electronicsRef}
      />
      <Beauty
        onScrollProduct={(scrollAmount) =>
          handleScroll(beautyRef, setBeautyScroll, scrollAmount)
        }
        item_width={item_width}
        containerRef={beautyRef}
      />
    </section>
  );
};

export default Products;
