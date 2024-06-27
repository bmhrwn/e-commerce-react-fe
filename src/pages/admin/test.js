import React, { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "../../services/CategoryService";
import MainPage from "../../components/MainPage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const CategoryAdminPage = () => {
  const [categorys, setCategorys] = useState([]);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [insertMode, setInsertMode] = useState(false);

  
  const emptyCategory = {
    id: null,
    name: "",
  };


  const [category, setCategory] = useState(emptyCategory);

  useEffect(() => {
    load();
  });

  const load = async () => {
    try {
      const response = await findAllCategory();
      setCategorys(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openNew = () => {
    setInsertMode(true);
    setCategoryDialog(true);
    setSubmited(false);
    setCategory(emptyCategory);
  };

  const hideDialog = () => {
    setCategoryDialog(false);
    setSubmited(false);
  };

  const hideDeleteDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const editCategory = (category) => {
    setInsertMode(false);
    setSubmited(false);
    setCategory({ ...category });
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category) => {
    setCategory(category);
    setDeleteCategoryDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-plain p-mr-2"
          onClick={() => editCategory(rowData)}
        />

        <Button
          className="p-button-rounded p-button-text p-button-plain"
          icon="pi pi-trash"
          onClick={() => confirmDeleteCategory(rowData)}
        />
      </React.Fragment>
    );
  };

  const findByIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < categorys.length; i++) {
      if (categorys[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const saveCategory = async () => {
    try {
      setSubmited(true);
      if (category.name.trim()) {
        if (insertMode) {
          const response = await createCategory(category);
          const data = response.data.data;
          const _categorys = [...categorys];
          _categorys.push(data);
          setCategorys(_categorys);
        } else {
          const response = await updateCategory(category);
          const data = response.data.data;
          const _categorys = [...categorys];
          const index = findByIndexById(data.id);
          _categorys[index] = data;
          setCategorys(_categorys);
        }
        setInsertMode(false);
        setCategoryDialog(false);
        setCategory(emptyCategory);
        setSubmited(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategorys = async () => {
    try {
      await deleteCategory(category.id);
      let _categorys = categorys.filter((val) => val.id !== category.id);
      setCategorys(_categorys);
      setDeleteCategoryDialog(false);
      setCategory(emptyCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />

      <Button
        label="Save Category"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveCategory}
      />
    </React.Fragment>
  );

  const deleteCategoryDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteDialog}
      />

      <Button
        label="Delete"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteCategory}
      />
    </React.Fragment>
  );

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Category</h2>
              <div className="p-d-inline">
                <Button
                  label="Add"
                  icon="pi pi-plus"
                  className="p-mr-2"
                  onClick={openNew}
                />
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={categorys}
                  size="small"
                  className="table-view"
                  stripedRows
                >
                  <Column field="name" header="Name Category"></Column>
                  <Column
                    body={actionBodyTemplate}
                    style={{ width: "120px", textAlign: "right" }}
                  ></Column>
                </DataTable>
              </div>
            </div>
            <Dialog
              visible={categoryDialog}
              style={{ width: "500px" }}
              header="Category"
              modal
              className="p-fluid"
              onHide={hideDialog}
              footer={categoryDialogFooter}
            >
              <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText
                  id="name"
                  value={category.name}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _category = { ...category };
                    _category.name = val;
                    setCategory(_category);
                  }}
                />
              {submited && !category.name && <small className="p-error">Name is required</small>}
              </div>
            </Dialog>

            <Dialog
              visible={deleteCategoryDialog}
              style={{ width: "500px" }}
              header="Confirm"
              modal
              footer={deleteCategoryDialogFooter}
              onHide={hideDeleteDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle p-mr-3"
                  style={{ fontSize: "2rem" }}
                ></i>
                {category && <span>Are you sure delete this category <b>{category.name}</b>?</span>}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default CategoryAdminPage;
