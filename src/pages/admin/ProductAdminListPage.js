import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { findAllProduct } from "../../services/ProductService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const ProductAdminListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllProduct();
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const nameBodyTemplate = (row) => {
    return(
        <Link to={`/admin/product/detail/${row.id}`} className="cell-link">{row.name}</Link>
    )
  }
  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Product</h2>
              <div>
                <Link to="/admin/product/create" style={{textDecoration:"none"}}>
                <Button label="Add" icon="pi pi-plus"/>
                 </Link>
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={products}
                  size="small"
                  stripedRows
                  className="table-view"
                >
                    <Column field="name" header="Product Name" body={nameBodyTemplate}/>
                    <Column field="category.name" header="Category Name"/>
                    <Column field="price" header="Price" style={{width:"100px"}}/>
                    <Column field="stock" header="Stock" style={{width:"100px"}}/>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProductAdminListPage;
