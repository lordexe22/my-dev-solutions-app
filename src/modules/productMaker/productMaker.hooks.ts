// #section Imports
import { useReducer } from 'react';
import * as types from './productMaker.d';
import { initialProductState } from './productMaker.config';
// #end-section

// #interface ModalState
interface ModalState {
  isOpen: boolean;
  formData: types.ProductBaseType;
  isEditing: boolean;
  editingProductId?: string;
}
// #end-interface

// #interface ProductListState
interface ProductListState {
  products: types.ProductBaseType[];
  showDeleteConfirm: boolean;
  productToDelete?: string;
}
// #end-interface

// #function modalFormReducer - Logic for modal form state management
const modalFormReducer = (state: ModalState, action: types.ProductActionsType): ModalState => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        isOpen: !state.isOpen,
        // Resetear formulario al cerrar
        formData: state.isOpen ? initialProductState : state.formData,
        isEditing: false,
        editingProductId: undefined
      };

    case 'EDIT_PRODUCT':
      if (!action.payload?.product || !action.payload?.productId) return state;
      
      return {
        ...state,
        isOpen: true,
        isEditing: true,
        editingProductId: action.payload.productId,
        formData: { ...action.payload.product }
      };

    case 'SET_FORM_FIELD':
      if (!action.payload?.field || action.payload.value === undefined) return state;
      
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value
        }
      };

    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...initialProductState,
          ...(action.payload?.formData || {})
        }
      };

    case 'RESET_FORM':
      return {
        ...state,
        formData: initialProductState,
        isEditing: false,
        editingProductId: undefined
      };

    default:
      return state;
  }
};
// #end-function

// #function productListReducer
const productListReducer = (state: ProductListState, action: types.ProductActionsType): ProductListState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      if (!action.payload?.product) return state;
      
      const newProduct = {
        ...action.payload.product,
        id: crypto.randomUUID() // Generar ID único
      };
      
      return {
        ...state,
        products: [...state.products, newProduct]
      };
    }

    case 'UPDATE_PRODUCT':
      if (!action.payload?.productId || !action.payload?.product) return state;
      
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload!.productId
            ? { ...action.payload!.product!, id: action.payload!.productId }
            : product
        )
      };

    case 'DELETE_PRODUCT':
      if (!action.payload?.productId) return state;
      
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload!.productId),
        showDeleteConfirm: false,
        productToDelete: undefined
      };

    case 'TOGGLE_DELETE_CONFIRM':
      return {
        ...state,
        showDeleteConfirm: !state.showDeleteConfirm,
        productToDelete: action.payload?.productId || undefined
      };

    default:
      return state;
  }
};
// #end-function

// #hook useProductModal
export const useProductModal = () => {
  const [state, dispatch] = useReducer(modalFormReducer, {
    isOpen: false,
    formData: initialProductState,
    isEditing: false,
    editingProductId: undefined
  });

  const openModal = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_FORM' });
  };

  const editProduct = (product: types.ProductBaseType, productId: string) => {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: { product, productId }
    });
  };

  const setFormField = (field: keyof types.ProductBaseType, value: unknown) => {
    dispatch({
      type: 'SET_FORM_FIELD',
      payload: { field, value }
    });
  };

  const setFormData = (formData: Partial<types.ProductBaseType>) => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { formData }
    });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return {
    isModalOpen: state.isOpen,
    formData: state.formData,
    isEditing: state.isEditing,
    editingProductId: state.editingProductId,
    openModal,
    closeModal,
    editProduct,
    setFormField,
    setFormData,
    resetForm
  };
};
// #end-hook

// #hook useProductList
export const useProductList = () => {
  const [state, dispatch] = useReducer(productListReducer, {
    products: [],
    showDeleteConfirm: false,
    productToDelete: undefined
  });

  const addProduct = (product: types.ProductBaseType) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { product }
    });
  };

  const updateProduct = (productId: string, product: types.ProductBaseType) => {
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: { productId, product }
    });
  };

  const deleteProduct = (productId: string) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: { productId }
    });
  };

  const showDeleteConfirmation = (productId: string) => {
    dispatch({
      type: 'TOGGLE_DELETE_CONFIRM',
      payload: { productId }
    });
  };

  const hideDeleteConfirmation = () => {
    dispatch({
      type: 'TOGGLE_DELETE_CONFIRM'
    });
  };

  return {
    products: state.products,
    showDeleteConfirm: state.showDeleteConfirm,
    productToDelete: state.productToDelete,
    addProduct,
    updateProduct,
    deleteProduct,
    showDeleteConfirmation,
    hideDeleteConfirmation
  };
};
// #end-hook

// #hook useProductMaker
export const useProductMaker = () => {
  const modal = useProductModal();
  const productList = useProductList();

  const createProduct = () => {
    // Validar que al menos tenga nombre
    if (!modal.formData.name.trim()) {
      console.warn('El nombre del producto es requerido');
      return;
    }

    if (modal.isEditing && modal.editingProductId) {
      // Actualizar producto existente
      productList.updateProduct(modal.editingProductId, modal.formData);
      console.log('Producto actualizado:', modal.formData);
    } else {
      // Agregar nuevo producto
      productList.addProduct(modal.formData);
      console.log('Producto creado:', modal.formData);
    }
    
    // Cerrar modal y resetear formulario
    modal.closeModal();
  };

  const editProduct = (product: types.ProductBaseType) => {
    if (!product.id) return;
    modal.editProduct(product, product.id);
  };

  const confirmDeleteProduct = () => {
    if (productList.productToDelete) {
      productList.deleteProduct(productList.productToDelete);
    }
  };

  return {
    // Modal properties
    isModalOpen: modal.isModalOpen,
    formData: modal.formData,
    isEditing: modal.isEditing,
    editingProductId: modal.editingProductId,
    
    // Modal actions
    openModal: modal.openModal,
    closeModal: modal.closeModal,
    setFormField: modal.setFormField,
    setFormData: modal.setFormData,
    resetForm: modal.resetForm,
    
    // Product list properties
    products: productList.products,
    showDeleteConfirm: productList.showDeleteConfirm,
    productToDelete: productList.productToDelete,
    
    // Product list actions
    addProduct: productList.addProduct,
    updateProduct: productList.updateProduct,
    deleteProduct: productList.deleteProduct,
    showDeleteConfirmation: productList.showDeleteConfirmation,
    hideDeleteConfirmation: productList.hideDeleteConfirmation,
    
    // Combined actions
    createProduct,
    editProduct,
    confirmDeleteProduct
  };
};
// #end-hook