import './styles.css';
import ProductMaker from './modules/productMaker/productMaker';
import MyCustomTag from './modules/myCustomTag/myCustomTag';
import { mockTags } from './modules/myCustomTag/myCustomTag.mock';

const App = () => {
  const a = 1;

  return(
  <>
    {
      a === 1 
      ? 
      <MyCustomTag tags={mockTags} mode='edit'/>
      :
      <ProductMaker/>
    }
  </>
  )
};

export default App;