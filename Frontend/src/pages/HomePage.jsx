import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';



export default function HomePage() {
  const [darkMode, setDarkMode] = useContext(ThemeContext)
  const [productArray, setProductArray] = useState([]);
  const [result, setresult] = useState('');
  const [loading, setLoading] = useState(true);
  // Fetching productData
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProductArray(response.data.data)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to load Data')
    }
  }

  const handleUpdate = async (id) => {
    setresult(productArray.find((res) => res._id == id))
  }
  // Delete Product Function
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`, { method: 'DELETE  ' });
      if (response.data.sucess) {
        setProductArray((prev) => prev.filter((productId) => productId._id != id))
      }
      toast.success(response.data.message)
    } catch (error) {
      toast.error('Error deleting product')
    }
  }

  // saveUpdates
  const saveUpdates = async (id, result) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, result)
      toast.success('Product Updated Successfully');
      setProductArray((product) => product.map((prod) => prod._id == id ? result : prod))
    } catch (error) {
      toast.error('Error updating product')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ backgroundColor: darkMode ? '#3c3c3c' : '#fff', color: darkMode ? '#fff' : '#000', height: 'calc(100vh - 50px)' }}>
      <div className="container">

        {
          loading ? (
            <div className="image d-flex align-items-center justify-content-center">
              {darkMode ? <img className='text-center' src='/loading2.gif' /> : <img className='text-center' src='/loading.gif' />}
            </div>
          ) : (
            <div className='d-flex flex-wrap py-5 gap-4 justify-content-center'>
              {
                productArray.length > 0 ? (
                  productArray.map((product) => (
                    <div className="card" style={{ width: '18rem', border: darkMode ? '1px solid #fff' : '1px solid rgb(60, 60, 60)' }} key={product.name}>
                      <img src={product.image} className="card-img-top" alt="..." style={{ height: '12rem' }} />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: ${product.name} is {product.price}</p>
                        <a type="button" className="btn btn-primary me-4" onClick={() => handleUpdate(product._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" >
                          Edit
                        </a>
                        <a type='button' className="btn btn-primary" onClick={() => handleDelete(product._id)}>Delete</a>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2>No Product Found  <Link to='/createPage' style={{ fontStyle: 'italic' }}>Create New Product</Link> </h2>
                )
              }
            </div>
          )
        }
      </div>


      {/* Modal Edit PAge */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ color: darkMode ? '#fff' : '#000', backgroundColor: darkMode ? 'rgb(48 48 48)' : '#fff' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" style={{ color: darkMode ? '#fff' : '#000' }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" >
              <form className='py-5'>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Product Name</label>

                  <input type="text" name='name' value={result.name == '' || result.name} onChange={(e) => setresult(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Product Price</label>
                  <input type="text" name='price' value={result.price == '' || result.price} onChange={(e) => setresult(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Image Url</label>
                  <input type="text" name='image' value={result.image == '' || result.image} onChange={(e) => setresult(e.target.value)} className="form-control" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => saveUpdates(result._id, result)}>Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
