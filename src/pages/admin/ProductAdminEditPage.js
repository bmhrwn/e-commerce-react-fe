import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { useNavigate, useParams } from "react-router-dom";
import { findAllCategory } from "../../services/CategoryService";
import { updateProduct, findProductById } from "../../services/ProductService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ProductAdminEditPage = () => {
  const [produk, setProduk] = useState();
  const [kategoris, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submited, setSubmited] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const loadKategori = async () => {
      try {
        const response = await findAllCategory();
        setKategoris(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadKategori();

    const loadProduct = async () => {
      try {
        const response = await findProductById(id);
        const _produk = response.data.data;
        setProduk(_produk);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const saveProduk = async () => {
    try {
      setSubmited(true);
      const response = await updateProduct(produk.id, produk);
      const _produk = response.data.data;
      navigate(`/admin/product/detail/${_produk.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Add Product</h2>
              </div>
              <div className="content-body">
                <div className="content-form shadow-1">
                  <div className="p-fluid mb-4">
                    <div className="p-filed mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <InputText
                        value={produk.name}
                        placeholder="Enter Name Product"
                        id="name"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _produk = { ...produk };
                          _produk.name = val;
                          setProduk(_produk);
                        }}
                      />
                      {submited && !produk.name && (
                        <span className="p-error">
                          Product Name is required
                        </span>
                      )}
                    </div>

                    <div className="p-field mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <Dropdown
                        optionLabel="name"
                        optionValue="id"
                        id="category_id"
                        value={produk.category.id}
                        options={kategoris}
                        placeholder="Select Category"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || null;
                          const _produk = { ...produk };
                          _produk.category.id = val;
                          setProduk(_produk);
                        }}
                      />
                      {submited && !produk.category_id && (
                        <span className="p-error">
                          Category Product is required
                        </span>
                      )}
                    </div>

                    <div className="p-filed mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <InputText
                        value={produk.description}
                        placeholder="Ketik description produk"
                        id="description"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _produk = { ...produk };
                          _produk.description = val;
                          setProduk(_produk);
                        }}
                      />
                    </div>

                    <div className="p-filed mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <InputText
                        value={produk.price}
                        placeholder="Ketik price produk"
                        id="price"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _produk = { ...produk };
                          _produk.price = val;
                          setProduk(_produk);
                        }}
                      />
                      {submited && !produk.price && (
                        <span className="p-error">
                          Price product is required
                        </span>
                      )}
                    </div>

                    <div className="p-filed mb-3">
                      <label htmlFor="stock" className="form-label">
                        Stock
                      </label>
                      <InputText
                        value={produk.stock}
                        placeholder="Ketik stock produk"
                        id="stock"
                        onChange={(e) => {
                          const val = (e.target && e.target.value) || "";
                          const _produk = { ...produk };
                          _produk.stock = val;
                          setProduk(_produk);
                        }}
                      />
                      {submited && !produk.stock && (
                        <span className="p-error">
                          Stock product is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <Button
                      label="Save"
                      icon="pi pi-check"
                      onClick={saveProduk}
                    />
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

export default ProductAdminEditPage;
