import './Sidebar.css';
import addProductIcon from '../../assets/Product_Cart.svg';
import listProductIcon from '../../assets/Product_list_icon.svg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/addproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img src={addProductIcon} alt="Add Product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to="/listproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img src={listProductIcon} alt="Product List" />
          <p>Product List</p>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
