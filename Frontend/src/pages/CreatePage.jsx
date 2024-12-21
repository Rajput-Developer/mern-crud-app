import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import axios from 'axios';
import { toast } from 'react-toastify';


export default function CreatePage() {
  const [darkMode, setDarkMode] = useContext(ThemeContext);
  const [errormsg, setErrormsg] = useState('');

  // const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const submitData = async (e) => {

    e.preventDefault()
    if (newProduct.name != '' && newProduct.image != '' && newProduct.price != '') {
      try {
        await axios.post('http://localhost:5000/api/products', newProduct);
        toast.success('Product added sucessfully');
        setNewProduct({ name: '', image: '', price: '' })
      } catch (error) {
        toast.error('Error in adding product')
      }
    } else {
      toast.error('Please Fill all Fields')
    }
  }
  return (
    <>
      <div className="create-page" style={{ height: 'calc(100vh - 50px)', backgroundColor: darkMode ? '#3c3c3c' : '#fff', color: darkMode ? '#fff' : '#000' }}>
        <div className="container">
          <form className='py-5'>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Product Name</label>
              <input type="text" name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Product Price</label>
              <input type="text" name='price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Image Url</label>
              <input type="text" name='image' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => submitData(e)}>Submit</button>
          </form>

        </div>
      </div>


    </>
  )
}
