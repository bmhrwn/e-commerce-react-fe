import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { Link, useParams } from "react-router-dom";
import { findProductById } from "../../services/ProductService";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";

const ProductAdminDetailPage = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [delDialog, setDelDialog] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await findProductById(id);
        const _product = response.data.data;
        setProduct(_product);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Detail Product {product.name}</h2>
              </div>
              <div>
                <Link to="/admin/product"> 
                <Button label="Back" icon="pi pi-chevron-left" className="mr-2" />
                </Link> 
                <Link to={`/admin/product/edit/${product.id}`}> 
                <Button label="Edit" icon="pi pi-pencil" className="mr-4" />
                </Link> 
              
              <Button icon="pi pi-trash" label="Delete" className="p-button-danger"/>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="grid">
                    <div className="col-fixed detail-label">Product Name</div>
                    <div className="col"> {product.name}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Category</div>
                    <div className="col"> {product.category.name}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Description</div>
                    <div className="col"> {product.description}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Price</div>
                    <div className="col"> {product.price}</div>
                  </div>
                  <div className="grid">
                    <div className="col-fixed detail-label">Stock</div>
                    <div className="col"> {product.stock}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default ProductAdminDetailPage;
