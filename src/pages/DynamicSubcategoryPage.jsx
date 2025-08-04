import { useParams } from 'react-router-dom';
import SubCategoryPage from './productCategories/SubCategoryPage';
import { RealEstateSubCategory } from './home/realEstateHome/RealEstateSubCategory';

export const DynamicSubCategoryPage = () => {
  const { category } = useParams();

  switch (category) {
    case 'real-estate':
      return <RealEstateSubCategory />;

    default:
      return <SubCategoryPage />;
  }
};
